import React from 'react';
import FolderTree from '../FolderTree';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h2>Folders & Documents</h2>
      </div>
      <FolderTree />
    </div>
  );
};

export default Sidebar; 