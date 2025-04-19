import React, { useState } from 'react';
import CreateFolderModal from '../../../Modals/CreateFolderModal';
import api from '../../../../api/axios';
import { ChevronRight, Plus } from 'react-feather';
import { GoogleDocs, Vector } from '../../../common/icons';
import { useDispatch, useSelector } from 'react-redux';
import { selectAllFolders, selectCurrentFolder, setCurrentFolderExpanded, setSelectedFolder } from '../../../../store/slices/folderSlice';
import { getParentFolderDetails } from '../../../../utils';
import { setCurrentFile } from '../../../../store/slices/fileSlice';

const FolderTreeItem = ({ folder, level = 0 }) => {
  const [isCreateFolderModalOpen, setIsCreateFolderModalOpen] = useState(false);
  const dispatch = useDispatch();
  const folders = useSelector(selectAllFolders);
  const currentFolder = useSelector(selectCurrentFolder);
  
  const handleToggle = (e) => {
    e.stopPropagation();
    if (folder.type === 'folder') {
      // setIsExpanded(!isExpanded);
      dispatch(setCurrentFolderExpanded(folder));
    }
    if (folder.type === 'file') {
      dispatch(setCurrentFile(folder));

    }
    let changeFile = file;
    if (folder.id === currentFolder?.id) {
      changeFile = getParentFolderDetails(folders, folder, folder.path.split(',').map(Number));
    }
    dispatch(setSelectedFolder(changeFile));
  };

  const handleAddFolder = (e) => {
    e.stopPropagation();
    setIsCreateFolderModalOpen(true);
  };

  const handleCreateFolderSubmit = (folderData) => {
    api.post('/folders/create', 
      {
        ...folderData,
        parent_id: folder.id,
      }
    )
      .then((response) => {
        console.log('Folder created successfully:', response.data);
        setIsCreateFolderModalOpen(false);
      })
      .catch((error) => {
        console.error('Error creating folder:', error);
      });
  };
  return (
    <div className="folder-tree__item">
      <div
        className={`folder-tree__item-content ${folder.expanded ? 'folder-tree__item-content--expanded' : ''}`}
        style={{ paddingLeft: `${level * 1.5}rem` }}
      >
        <div className="folder-tree__item-left" onClick={handleToggle}>
          <button className="folder-tree__toggle">
            <ChevronRight size={14} strokeWidth={2.5} />
          </button>
          <div className="folder-tree__icon">
              {folder.type === 'folder' ? (
                <Vector size={18} />
              ) : (
                <GoogleDocs size={18} />
              )}
          </div>
          <span className="folder-tree__label">{folder.name}</span>
        </div>
        {/* {isHovered && ( */}
          <button className="folder-tree__add" disabled={folder.type === 'file'} onClick={handleAddFolder} title="Add Folder">
            <Plus size={16} strokeWidth={2.5} />
          </button>
        {/* )} */}
      </div>
      {folder.expanded && folder.children && (
        <div className="folder-tree__children">
          {folder.children.map((child) => (
            <FolderTreeItem
              key={child.id}
              folder={child}
              level={level + 1}
            />
          ))}
        </div>
      )}
       <CreateFolderModal
        isOpen={isCreateFolderModalOpen}
        onClose={() => setIsCreateFolderModalOpen(false)}
        onCreateFolder={handleCreateFolderSubmit}
      />
     
    </div>
  );
};
export default FolderTreeItem;