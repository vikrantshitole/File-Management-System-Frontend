import React, { useState, useRef } from 'react';
import { MoreVertical } from 'react-feather';
import FolderOptionsMenu from '../../common/FolderOptionsMenu/FolderOptionsMenu';
import { Vector, GoogleDocs } from '../../common/icons';
import CreateFolderModal from '../../Modals/CreateFolderModal';
import UploadDocumentModal from '../../Modals/UploadDocumentModal/UploadDocumentModal';
import api from '../../../api/axios';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentFile } from '../../../store/slices/fileSlice';
import { setSelectedFolder, selectCurrentFolder, selectAllFolders, setCurrentFolderExpanded } from '../../../store/slices/folderSlice';
import { getParentFolderDetails, formatDate } from '../../../utils';

const FileListItem = ({ file, level = 0 }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const moreButtonRef = useRef(null);
  // const [isExpanded, setIsExpanded] = useState(false);
  const [isCreateFolderModalOpen, setIsCreateFolderModalOpen] = useState(false);
  const [isUploadFileModalOpen, setIsUploadFileModalOpen] = useState(false);
  const dispatch = useDispatch();
  const currentFolder = useSelector(selectCurrentFolder);
  const folders = useSelector(selectAllFolders);

  const isFolder = file.children && file.children.length > 0;

  const handleMoreClick = () => {
    setIsMenuOpen(true);
  };

  const handleEdit = () => {
    setIsMenuOpen(false);
  };

  const handleDelete = () => {
    setIsMenuOpen(false);
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
    api.post('/folders/create', { ...folderData, parent_id: file.id })
      .then((response) => {
        console.log('Folder created successfully:', response.data);
        setIsCreateFolderModalOpen(false);
      })
      .catch((error) => {
        console.error('Error creating folder:', error);
      });
  };
  
  const handleIconClick = () => {
    if (isFolder) {
      // setIsExpanded(!isExpanded);
      dispatch(setCurrentFolderExpanded(file));
    }
    if (file.type === 'file') {
      dispatch(setCurrentFile(file));

    }
    let changeFile = file;
    if (file.id === currentFolder?.id) {
      changeFile = getParentFolderDetails(folders, file, file.path.split(',').map(Number));
    }
    dispatch(setSelectedFolder(changeFile));
  }

  return (

    <>
      <tr className="file-list__row">
        <td className="file-list__cell file-list__cell--icon" style={{ paddingLeft: `${level ? level * 30 : 10}px` }}>
          <span onClick={handleIconClick} style={{ cursor: isFolder ? 'pointer' : 'default' }}>

            {file.type === 'folder' ? (
              <Vector size={20} />
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
          <FileListItem key={child.id} file={child} level={level + 1} />
        ))}
      <CreateFolderModal
        isOpen={isCreateFolderModalOpen}
        onClose={() => setIsCreateFolderModalOpen(false)}
        onCreateFolder={handleCreateFolderSubmit}
      />
      <UploadDocumentModal
        isOpen={isUploadFileModalOpen}
        folderId={file.id}
        onClose={() => setIsUploadFileModalOpen(false)}
      />


    </>
  );
};

export default FileListItem; 