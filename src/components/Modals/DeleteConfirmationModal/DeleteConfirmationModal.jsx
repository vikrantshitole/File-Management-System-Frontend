import React, { useCallback, useMemo } from 'react';
import Modal from '../Modal';
import { Trash2 } from 'react-feather';
import './DeleteConfirmationModal.scss';
import { setRefreshData } from '../../../store/slices/folderSlice';
import { useDispatch } from 'react-redux';
import api from '../../../api/axios';

const DeleteConfirmationModal = React.memo(
  ({
    isOpen,
    onClose,
    itemName,
    itemType = 'file', // 'file' or 'folder'
    itemId,
  }) => {
    const dispatch = useDispatch();

    const handleConfirm = useCallback(() => {
      api
        .delete(`/${itemType}s/` + itemId)
        .then(response => {
          onClose();
          dispatch(setRefreshData(true));
        })
        .catch(error => {
          console.error('Error deleting file:', error);
        });
    }, [itemType, itemId, onClose, dispatch]);

    const modalFooter = useMemo(
      () => (
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
      ),
      [onClose, handleConfirm]
    );

    const modalContent = useMemo(
      () => (
        <div className="delete-confirmation-modal__content">
          <div className="delete-confirmation-modal__icon">
            <Trash2 size={24} />
          </div>
          <p className="delete-confirmation-modal__message">
            Are you sure you want to delete {itemType} "{itemName}"?
          </p>
          <p className="delete-confirmation-modal__warning">This action cannot be undone.</p>
        </div>
      ),
      [itemType, itemName]
    );

    return (
      <Modal isOpen={isOpen} onClose={onClose} title={`Delete ${itemType}`} footer={modalFooter}>
        {modalContent}
      </Modal>
    );
  },
  (prevProps, nextProps) => {
    return (
      prevProps.isOpen === nextProps.isOpen &&
      prevProps.itemName === nextProps.itemName &&
      prevProps.itemType === nextProps.itemType &&
      prevProps.itemId === nextProps.itemId
    );
  }
);

DeleteConfirmationModal.displayName = 'DeleteConfirmationModal';

export default DeleteConfirmationModal;
