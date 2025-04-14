import React from 'react';
import FolderTreeItem from './components/FolderTreeItem';

const FolderTree = () => {
  // Temporary data for demonstration
  const tempFolders = [
    { name: 'Documents', type: 'folder' },
    { name: 'Images', type: 'folder' },
    { name: 'Projects', type: 'folder' }
  ];

  return (
    <div className="folder-tree">
      {tempFolders.map((folder) => (
        <FolderTreeItem key={folder.name} folder={folder} />
      ))}
    </div>
  );
};

export default FolderTree; 