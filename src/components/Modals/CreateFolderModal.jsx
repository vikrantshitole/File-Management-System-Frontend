import React, { useState } from 'react';
import Modal from './Modal';
import './CreateFolderModal.scss';

const CreateFolderModal = ({ isOpen, onClose, onCreateFolder }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate inputs
    const newErrors = {};
    if (!name.trim()) {
      newErrors.name = 'Folder name is required';
    }
    if (!description.trim()) {
      newErrors.description = 'Description is required';
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    // Call the onCreateFolder function with the folder data
    onCreateFolder({
      name: name.trim(),
      description: description.trim()
    });
    
    // Reset form
    setName('');
    setDescription('');
    setErrors({});
    
    // Close modal
    onClose();
  };

  const handleCancel = () => {
    // Reset form
    setName('');
    setDescription('');
    setErrors({});
    
    // Close modal
    onClose();
  };

  const modalFooter = (
    <>
      <button 
        className="btn btn-secondary" 
        onClick={handleCancel}
      >
        Cancel
      </button>
      <button 
        className="btn btn-primary" 
        onClick={handleSubmit}
      >
        Create
      </button>
    </>
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Create Folder"
      footer={modalFooter}
    >
      <form className="create-folder-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="folder-name">Name</label>
          <input
            id="folder-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter folder name"
            className={errors.name ? 'input-error' : ''}
          />
          {errors.name && <div className="error-message">{errors.name}</div>}
        </div>
        
        <div className="form-group">
          <label htmlFor="folder-description">Description</label>
          <textarea
            id="folder-description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter folder description (optional)"
            rows={3}
          />
          {errors.description && <div className="error-message">{errors.description}</div>}
          </div>
      </form>
    </Modal>
  );
};

export default CreateFolderModal; 