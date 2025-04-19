import React from 'react';
import Modal from '../Modal';
import { Trash2 } from 'react-feather';
import './DeleteConfirmationModal.scss';

const DeleteConfirmationModal = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  itemName,
  itemType = 'file' // 'file' or 'folder'
}) => {
  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  const modalFooter = (
    <div className="delete-confirmation-modal__footer">
      <button
        className="delete-confirmation-modal__button delete-confirmation-modal__button--secondary"
        onClick={onClose}
      >
        Cancel
      </button>
      <button
        className="delete-confirmation-modal__button delete-confirmation-modal__button--danger"
        onClick={handleConfirm}
      >
        Delete
      </button>
    </div>
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Delete ${itemType}`}
      footer={modalFooter}
    >
      <div className="delete-confirmation-modal__content">
        <div className="delete-confirmation-modal__icon">
          <Trash2 size={24} />
        </div>
        <p className="delete-confirmation-modal__message">
          Are you sure you want to delete {itemType} "{itemName}"?
        </p>
        <p className="delete-confirmation-modal__warning">
          This action cannot be undone.
        </p>
      </div>
    </Modal>
  );
};

export default DeleteConfirmationModal; 