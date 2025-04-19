import React, { useState } from 'react';
import './FolderTree.scss';
import { useSelector } from 'react-redux';
import { selectAllFolders } from '../../../store/slices/folderSlice';
import FolderTreeItem from './components/FolderTreeItem';



const FolderTree = () => {
  const files = useSelector(selectAllFolders)

  return (
    <div className="folder-tree">
      {files.map((folder) => (
        <FolderTreeItem key={folder.id} folder={folder} />
      ))}
    </div>
  );
};

export default FolderTree; 