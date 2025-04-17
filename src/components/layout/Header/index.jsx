import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, Filter, Plus, Upload } from 'react-feather';
import { Vector } from '../../common/icons';
import CreateFolderModal from '../../Modals/CreateFolderModal';
import './Header.scss';

const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isCreateFolderModalOpen, setIsCreateFolderModalOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleCreateFolder = () => {
    setIsCreateFolderModalOpen(true);
    setIsDropdownOpen(false);
  };

  const handleUploadDocument = () => {
    // TODO: Implement upload document functionality
    setIsDropdownOpen(false);
  };

  const handleCreateFolderSubmit = (folderData) => {
    // TODO: Implement folder creation logic
  };

  const handlePlusClick = () => {
    // If dropdown is already open, open the modal and close dropdown
    if (isDropdownOpen) {
      setIsCreateFolderModalOpen(true);
      setIsDropdownOpen(false);
    } else {
      // Otherwise, just open the dropdown
      setIsDropdownOpen(true);
    }
  };

  return (
    <header className="header">
      <div className="header__navigation">
        <button className="header__back-button">
          <ChevronLeft size={20} />
        </button>
        <div className="header__breadcrumb">
          <span className="header__breadcrumb-item">NSM</span>
          <span className="header__breadcrumb-separator">&gt;</span>
          <span className="header__breadcrumb-item header__breadcrumb-item--active">
            Folders & Documents
          </span>
        </div>
      </div>
      <div className="header__actions">
        <button className="header__action-button">
          <Filter size={18} />
        </button>
        <div className="header__dropdown" ref={dropdownRef}>
          <button 
            className={`header__action-button ${isDropdownOpen ? 'header__action-button--active' : ''}`}
            onClick={handlePlusClick}
          >
            <Plus size={18} />
          </button>
          {isDropdownOpen && (
            <div className="header__dropdown-menu">
              <button className="header__dropdown-item" onClick={handleCreateFolder}>
                <Vector size={16} />
                <span>Create Folder</span>
              </button>
              <button className="header__dropdown-item" onClick={handleUploadDocument}>
                <Upload size={16} />
                <span>Upload Document</span>
              </button>
            </div>
          )}
        </div>
      </div>

      <CreateFolderModal
        isOpen={isCreateFolderModalOpen}
        onClose={() => setIsCreateFolderModalOpen(false)}
        onCreateFolder={handleCreateFolderSubmit}
      />
    </header>
  );
};

export default Header; 