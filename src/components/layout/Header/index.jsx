import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, Filter, Plus, Upload } from 'react-feather';
import { Vector } from '../../common/icons';
import CreateFolderModal from '../../Modals/CreateFolderModal';
import FiltersPopup from '../../Modals/FiltersModal/FiltersModal';
import './Header.scss';
import api from '../../../api/axios';
import Breadcrumb from '../../common/Breadcrumb';
import UploadDocumentModal from '../../Modals/UploadDocumentModal/UploadDocumentModal';

const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isCreateFolderModalOpen, setIsCreateFolderModalOpen] = useState(false);
  const [isUploadFileModalOpen, setIsUploadFileModalOpen] = useState(false);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  const dropdownRef = useRef(null);
  const filterButtonRef = useRef(null);

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
    setIsDropdownOpen(false);
  };

  const handleCreateFolderSubmit = (folderData) => {
    api.post('/folders/create', folderData)
      .then((response) => {
        console.log('Folder created successfully:', response.data);
        setIsCreateFolderModalOpen(false);
      })
      .catch((error) => {
        console.error('Error creating folder:', error);
      });
  };

  const handlePlusClick = () => {
    if (isDropdownOpen) {
      setIsCreateFolderModalOpen(true);
      setIsDropdownOpen(false);
    } else {
      setIsDropdownOpen(true);
    }
  };

  const handleFilterClick = () => {
    setIsFiltersOpen(!isFiltersOpen);
  };

  return (
    <header className="header">
      <Breadcrumb />
      <div className="header__actions">
        <button 
          ref={filterButtonRef}
          className={`header__action-button ${isFiltersOpen ? 'header__action-button--active' : ''}`}
          onClick={handleFilterClick}
        >
          <Filter size={18} color={'#ffffff'} fill='#ffffff' />
        </button>
        <div className="header__dropdown" ref={dropdownRef} onMouseDown={handleClickOutside}>
          <button 
            className={`header__action-button ${isDropdownOpen ? 'header__action-button--active' : ''}`}
            onClick={handlePlusClick}
          >
            <Plus size={18} color={'#ffffff'} fill='#ffffff' fontSize={18}/>
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
      <FiltersPopup
        isOpen={isFiltersOpen}
        onClose={() => setIsFiltersOpen(false)}
        anchorRef={filterButtonRef}
      />
    </header>
  );
};

export default Header; 