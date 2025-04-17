import React, { useState } from 'react';
import { ChevronRight, Plus } from 'react-feather';
import { Vector } from '../../common/icons';
import './FolderTree.scss';
import { useSelector } from 'react-redux';
import { selectAllFolders } from '../../../store/slices/folderSlice';
import CreateFolderModal from '../../Modals/CreateFolderModal';
import api from '../../../api/axios';

const FolderItem = ({ folder, level = 0 }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isCreateFolderModalOpen, setIsCreateFolderModalOpen] = useState(false);

  const handleToggle = (e) => {
    e.stopPropagation();
    setIsExpanded(!isExpanded);
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
        className={`folder-tree__item-content ${isExpanded ? 'folder-tree__item-content--expanded' : ''}`}
        style={{ paddingLeft: `${level * 1.5}rem` }}
      >
        <div className="folder-tree__item-left" onClick={handleToggle}>
          <button className="folder-tree__toggle">
            <ChevronRight size={14} strokeWidth={2.5} />
          </button>
          <div className="folder-tree__icon">
            <Vector size={18} />
          </div>
          <span className="folder-tree__label">{folder.name}</span>
        </div>
        {/* {isHovered && ( */}
          <button className="folder-tree__add" onClick={handleAddFolder} title="Add Folder">
            <Plus size={16} strokeWidth={2.5} />
          </button>
        {/* )} */}
      </div>
      {isExpanded && folder.children && (
        <div className="folder-tree__children">
          {folder.children.map((child) => (
            <FolderItem
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

const FolderTree = () => {
  const files = useSelector(selectAllFolders)

  return (
    <div className="folder-tree">
      {files.map((folder) => (
        <FolderItem key={folder.id} folder={folder} />
      ))}
    </div>
  );
};

export default FolderTree; 