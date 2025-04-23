import React, { useEffect, useRef } from 'react';
import '@styles/FolderOptionsMenu.scss';
import { FileUploadIcon, FolderPlusIcon, PencilIcon, TrashIcon } from '@components/common/icons';

const FolderOptionsMenu = ({
  isOpen,
  onClose,
  position,
  onEdit,
  onDelete,
  onCreateFolder,
  onUploadDocument,
  isFolder,
}) => {
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = event => {
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
    <div className="folder-options-menu" ref={menuRef} style={menuStyle}>
      {isFolder && (
        <button className="folder-options-menu__item" onClick={onEdit}>
          <PencilIcon size={18} />
          <span>Edit</span>
        </button>
      )}

      <button className="folder-options-menu__item" onClick={onDelete}>
        <TrashIcon size={18} />
        <span>Delete</span>
      </button>

      {isFolder && (
        <button className="folder-options-menu__item" onClick={onCreateFolder} disabled={!isFolder}>
          <FolderPlusIcon size={18} />
          <span>Create Folder</span>
        </button>
      )}
      {isFolder && (
        <button
          className="folder-options-menu__item"
          onClick={onUploadDocument}
          disabled={!isFolder}
        >
          <FileUploadIcon size={18} />
          <span>Upload Document</span>
        </button>
      )}
    </div>
  );
};

export default React.memo(FolderOptionsMenu);
