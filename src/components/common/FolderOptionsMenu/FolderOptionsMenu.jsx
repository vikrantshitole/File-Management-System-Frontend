import React, { useEffect, useRef } from 'react';
import { Edit2, Trash2, FolderPlus, Upload } from 'react-feather';
import './FolderOptionsMenu.scss';

const FolderOptionsMenu = ({ 
  isOpen, 
  onClose, 
  position,
  onEdit,
  onDelete,
  onCreateFolder,
  onUploadDocument
}) => {
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const menuStyle = {
    top: `${position.y}px`,
    left: `${position.x}px`,
  };

  return (
    <div 
      className="folder-options-menu"
      ref={menuRef}
      style={menuStyle}
    >
      <button 
        className="folder-options-menu__item"
        onClick={onEdit}
      >
        <Edit2 size={18} />
        <span>Edit</span>
      </button>

      <button 
        className="folder-options-menu__item"
        onClick={onDelete}
      >
        <Trash2 size={18} />
        <span>Delete</span>
      </button>

      <button 
        className="folder-options-menu__item"
        onClick={onCreateFolder}
      >
        <FolderPlus size={18} />
        <span>Create Folder</span>
      </button>

      <button 
        className="folder-options-menu__item"
        onClick={onUploadDocument}
      >
        <Upload size={18} />
        <span>Upload Document</span>
      </button>
    </div>
  );
};

export default FolderOptionsMenu; 