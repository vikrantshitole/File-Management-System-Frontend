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

const FileListItem = ({ file, level = 0, onUploadFile, onCreateFolder, onUpdateFolder, setFile }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const moreButtonRef = useRef(null);
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
    onUpdateFolder(true);
    setFile(file);
    setIsMenuOpen(false);
  };

  const handleDelete = () => {
    setIsMenuOpen(false);
    setIsDeleteConfirmationModalOpen(true);

  };

  const handleCreateFolder = () => {
    onCreateFolder(true);
    setIsMenuOpen(false);
  };

  const handleUploadDocument = () => {
    setIsMenuOpen(false);
    onUploadFile(file.id);
  };

  const getMenuPosition = () => {
    if (!moreButtonRef.current) return { x: 0, y: 0 };

    const rect = moreButtonRef.current.getBoundingClientRect();
    return {
      x: rect.right,
      y: rect.top + 20
    };
  };

  const handleIconClick = () => {
    if (isFolder) {
      dispatch(setCurrentFolderExpanded(file));
    }
    if (file.type === 'file') {
      dispatch(setCurrentFile(file));

    }
    let changeFile = file;
    if ((file.id === currentFolder?.id || file.expanded) && file.type === 'folder') {
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
          <FileListItem key={isFolder? child.id : child.id + child.file_path} file={child} level={level + 1} onUploadFile={onUploadFile}/>
        ))}
        
     
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