import React from 'react';

const FolderTreeItem = ({ folder }) => {
  return (
    <div className="folder-tree-item">
      <div className="folder-header">
        <span className="icon">{folder.type === 'folder' ? '📁' : '📄'}</span>
        <span className="name">{folder.name}</span>
      </div>
    </div>
  );
};

export default FolderTreeItem; 