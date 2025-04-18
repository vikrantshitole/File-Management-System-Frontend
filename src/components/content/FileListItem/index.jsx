import React, { useState, useRef } from 'react';
import { MoreVertical } from 'react-feather';
import FolderOptionsMenu from '../../common/FolderOptionsMenu/FolderOptionsMenu';
import { Vector, GoogleDocs } from '../../common/icons';
import CreateFolderModal from '../../Modals/CreateFolderModal';
import UploadDocumentModal from '../../Modals/UploadDocumentModal/UploadDocumentModal';
import api from '../../../api/axios';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentFile } from '../../../store/slices/fileSlice';
import { setSelectedFolder, selectCurrentFolder, selectAllFolders, setCurrentFolderExpanded, setRefreshData } from '../../../store/slices/folderSlice';
import { getParentFolderDetails, formatDate } from '../../../utils';
import DeleteConfirmationModal from '../../Modals/DeleteConfirmationModal/DeleteConfirmationModal';

const FileListItem = ({ file, level = 0 }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const moreButtonRef = useRef(null);
  const [isUpdateFolder, setIsUpdateFolder] = useState(false);
  const [isCreateFolderModalOpen, setIsCreateFolderModalOpen]  = useState(false);
  const [isUploadFileModalOpen, setIsUploadFileModalOpen] = useState(false);
  const [isDeleteConfirmationModalOpen, setIsDeleteConfirmationModalOpen] = useState(false);
  const dispatch = useDispatch();
  const currentFolder = useSelector(selectCurrentFolder);
  const folders = useSelector(selectAllFolders);

  const isFolder = file.type === 'folder';

  const handleMoreClick = (e) => {
    e.stopPropagation();
    setIsMenuOpen(true);
  };

  const handleEdit = () => {
    setIsUpdateFolder(true);
    setIsMenuOpen(false);
  };

  const handleDelete = () => {
    setIsMenuOpen(false);
    setIsDeleteConfirmationModalOpen(true);

  };

  const handleCreateFolder = () => {
    setIsCreateFolderModalOpen(true);
    setIsMenuOpen(false);
  };

  const handleUploadDocument = () => {
    setIsUploadFileModalOpen(true);
    setIsMenuOpen(false);
  };

  const getMenuPosition = () => {
    if (!moreButtonRef.current) return { x: 0, y: 0 };

    const rect = moreButtonRef.current.getBoundingClientRect();
    return {
      x: rect.right,
      y: rect.top + 20
    };
  };

  const handleCreateFolderSubmit = (folderData) => {
    let apiUrl = '/folders/create';
    let apiMethod = 'post';
    let postData = { ...folderData, parent_id: file.id };
    if (isUpdateFolder) {
      apiUrl = '/folders/update/' + file.id;
      apiMethod = 'put';
      postData = { ...folderData, id: file.id ,parent_id: file.parent_id};
    }
    api[apiMethod](apiUrl, postData)
      .then((response) => {
        dispatch(setRefreshData(true));
      })
      .catch((error) => {
        console.error('Error creating folder:', error);
      })
      .finally(() => {
        setIsCreateFolderModalOpen(false);
        setIsUpdateFolder(false);
      });
  };
  
  const handleIconClick = () => {
    if (isFolder) {
      dispatch(setCurrentFolderExpanded(file));
    }
    if (file.type === 'file') {
      dispatch(setCurrentFile(file));

    }
    let changeFile = file;
    if (file.id === currentFolder?.id || file.expanded) {
      changeFile = getParentFolderDetails(folders, file, file.path.split(',').map(Number));
    }
    dispatch(setSelectedFolder(changeFile));
  }

  const handleDeleteConfirmation = () => {
    api.delete(`/${file.type}s/` + file.id)
      .then((response) => {
        dispatch(setRefreshData(true));
        setIsDeleteConfirmationModalOpen(false);
      })
      .catch((error) => {
        console.error('Error deleting file:', error);
      });
  }

  return (

    <>
      <tr className="file-list__row" onClick={handleIconClick}>
        <td className="file-list__cell file-list__cell--icon" style={{ paddingLeft: `${level ? level * 30 : 10}px` }}>
          <span style={{ cursor: isFolder ? 'pointer' : 'default' }}>

            {file.type === 'folder' ? (
              <>
                <span className="badge" style={{ left:`${level?level*28 - file.level:5}px` }}>
                  {file.subfolder_count} 
                </span>
                <Vector size={20} />
              </>
            ) : (
              <GoogleDocs size={20} />
            )}
          </span>
        </td>
        <td className="file-list__cell file-list__cell--name">
          {file.name}
        </td>
        <td className="file-list__cell file-list__cell--description">
          {file.description}
        </td>
        <td className="file-list__cell file-list__cell--date">
          {formatDate(file.created_at)}
        </td>
        <td className="file-list__cell file-list__cell--date">
          {formatDate(file.updated_at)}
        </td>
        <td className="file-list__cell file-list__cell--actions">
          <button className="file-list__action-button" ref={moreButtonRef} onClick={handleMoreClick}
          >
            <MoreVertical size={16} />
          </button>

          <FolderOptionsMenu
            isOpen={isMenuOpen}
            isFolder={isFolder}
            onClose={() => setIsMenuOpen(false)}
            position={getMenuPosition()}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onCreateFolder={handleCreateFolder}
            onUploadDocument={handleUploadDocument}
          />
        </td>
      </tr>

      {file.expanded &&
        file.children.map((child) => (
          <FileListItem key={child.type === 'folder' ? child.id : child.id+child.file_path} file={child} level={level + 1} />
        ))}
      <CreateFolderModal
        isOpen={isCreateFolderModalOpen || isUpdateFolder}
        folder={isUpdateFolder ? file : null}
        onClose={() => {
          setIsCreateFolderModalOpen(false);
          setIsUpdateFolder(false);
        }}
        onCreateFolder={handleCreateFolderSubmit}
      />
      <UploadDocumentModal
        isOpen={isUploadFileModalOpen}
        folderId={file.id}
        onClose={() => setIsUploadFileModalOpen(false)}
      />
  
        <DeleteConfirmationModal
          isOpen={isDeleteConfirmationModalOpen}
          onClose={() => setIsDeleteConfirmationModalOpen(false)}
          onConfirm={handleDeleteConfirmation}
          itemName={file.name}
          itemType={file.type}
        />

    </>
  );
};

export default FileListItem; 