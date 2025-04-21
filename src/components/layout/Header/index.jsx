import React, { useState, useRef, useCallback, useMemo } from 'react';
import { Filter, Plus, Upload } from 'react-feather';
import { Vector } from '../../common/icons';
import CreateFolderModal from '../../Modals/CreateFolderModal/CreateFolderModal';
import FiltersPopup from '../../Modals/FiltersModal/FiltersModal';
import './Header.scss';
import Breadcrumb from '../../common/Breadcrumb';
import UploadDocumentModal from '../../Modals/UploadDocumentModal/UploadDocumentModal';

const Header = React.memo(({ setFilterData, sideBarOpen, setSideBarOpen }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isCreateFolderModalOpen, setIsCreateFolderModalOpen] = useState(false);
  const [isUploadFileModalOpen, setIsUploadFileModalOpen] = useState(false);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const dropdownRef = useRef(null);
  const filterButtonRef = useRef(null);

  const handleClickOutside = useCallback(event => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }
  }, []);

  const handleCreateFolder = useCallback(() => {
    setIsCreateFolderModalOpen(true);
    setIsDropdownOpen(false);
  }, []);

  const handleUploadDocument = useCallback(() => {
    setIsUploadFileModalOpen(true);
    setIsDropdownOpen(false);
  }, []);

  const handlePlusClick = useCallback(() => {
    if (isDropdownOpen) {
      setIsCreateFolderModalOpen(true);
      setIsDropdownOpen(false);
    } else {
      setIsDropdownOpen(true);
    }
  }, [isDropdownOpen]);

  const handleFilterClick = useCallback(() => {
    setIsFiltersOpen(!isFiltersOpen);
  }, [isFiltersOpen]);

  const handleCloseCreateFolderModal = useCallback(() => {
    setIsCreateFolderModalOpen(false);
  }, []);

  const handleCloseUploadModal = useCallback(() => {
    setIsUploadFileModalOpen(false);
  }, []);

  const handleCloseFilters = useCallback(() => {
    setIsFiltersOpen(false);
  }, []);

  const dropdownMenu = useMemo(() => (
    isDropdownOpen && (
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
    )
  ), [isDropdownOpen, handleCreateFolder, handleUploadDocument]);

  return (
    <header className="header">
      <Breadcrumb setSideBarOpen={setSideBarOpen} sideBarOpen={sideBarOpen} />
      <div className="header__actions">
        <button
          ref={filterButtonRef}
          className={`header__action-button ${isFiltersOpen ? 'header__action-button--active' : ''}`}
          onClick={handleFilterClick}
        >
          <Filter size={18} color={'#ffffff'} fill="#ffffff" />
        </button>
        <div className="header__dropdown" ref={dropdownRef} onMouseDown={handleClickOutside}>
          <button
            className={`header__action-button ${isDropdownOpen ? 'header__action-button--active' : ''}`}
            onClick={handlePlusClick}
          >
            <Plus size={18} color={'#ffffff'} fill="#ffffff" fontSize={18} />
          </button>
          {dropdownMenu}
        </div>
      </div>

      <CreateFolderModal
        isOpen={isCreateFolderModalOpen}
        onClose={handleCloseCreateFolderModal}
      />
      <UploadDocumentModal
        isOpen={isUploadFileModalOpen}
        onClose={handleCloseUploadModal}
      />
      <FiltersPopup
        isOpen={isFiltersOpen}
        onClose={handleCloseFilters}
        anchorRef={filterButtonRef}
        setFilterData={setFilterData}
      />
    </header>
  );
}, (prevProps, nextProps) => {
  return prevProps.sideBarOpen === nextProps.sideBarOpen;
});

Header.displayName = 'Header';

export default Header;
