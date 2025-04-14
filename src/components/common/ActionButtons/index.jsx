import React from 'react';

const ActionButtons = () => {
  return (
    <div className="action-buttons">
      <button className="filter-button">
        <span className="icon">🔍</span>
      </button>
      <button className="action-button">
        <span className="icon">+</span>
        Create Folder
      </button>
      <button className="action-button primary">
        <span className="icon">+</span>
        Upload Document
      </button>
    </div>
  );
};

export default ActionButtons; 