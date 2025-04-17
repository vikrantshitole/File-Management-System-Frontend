import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, Filter, Plus, Upload } from 'react-feather';
import { Vector } from '../../common/icons';
import CreateFolderModal from '../../Modals/CreateFolderModal';
import './Header.scss';
import api from '../../../api/axios';
import Breadcrumb from '../../common/Breadcrumb';
import UploadDocumentModal from '../../Modals/UploadDocumentModal/UploadDocumentModal';

const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isCreateFolderModalOpen, setIsCreateFolderModalOpen] = useState(false);
  const [isUploadFileModalOpen, setIsUploadFileModalOpen] = useState(false);

  const dropdownRef = useRef(null);

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }
  };
  const handleCreateFolder = () => {
    setIsCreateFolderModalOpen(true);
    setIsDropdownOpen(false);
  };

  const handleUploadDocument = () => {
    setIsUploadFileModalOpen(true);
    // TODO: Implement upload document functionality
    setIsDropdownOpen(false);
  };

  const handleCreateFolderSubmit = (folderData) => {
    // TODO: Implement folder creation logic
    api.post('/folders/create',folderData).then((response) => {
      console.log('Folder created successfully:', response.data);
      setIsCreateFolderModalOpen(false);
    }
    ).catch((error) => {
      console.error('Error creating folder:', error);
    })
    // Close the modal after creating the folder    };
  }
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
      <Breadcrumb />
         <div className="header__actions">
        <button className="header__action-button">
          <Filter size={18} />
        </button>
        <div className="header__dropdown" ref={dropdownRef} onMouseDown={handleClickOutside}>
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
      <UploadDocumentModal
        isOpen={isUploadFileModalOpen}
        onClose={() => setIsUploadFileModalOpen(false)}
      />
    
    </header>
  );
};

export default Header; 