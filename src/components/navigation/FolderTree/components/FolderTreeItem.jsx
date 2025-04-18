import React, { useState } from 'react';
import CreateFolderModal from '../../../Modals/CreateFolderModal';
import api from '../../../../api/axios';
import { ChevronRight, Plus } from 'react-feather';
import { GoogleDocs, Vector } from '../../../common/icons';
import { useDispatch, useSelector } from 'react-redux';
import { selectAllFolders, selectCurrentFolder, setCurrentFolderExpanded, setRefreshData, setSelectedFolder } from '../../../../store/slices/folderSlice';
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

      dispatch(setCurrentFolderExpanded(folder));
    }
    if (folder.type === 'file') {
      dispatch(setCurrentFile(folder));

    }
    let changeFile = folder;
    if (folder.id === currentFolder?.id || folder.expanded) {
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
        setIsCreateFolderModalOpen(false);
        dispatch(setRefreshData(true));
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
        onClick={handleToggle}
      >
        <div className="folder-tree__item-left" >
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
              key={child.type === 'folder' ? child.id : child.id+child.file_path}
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