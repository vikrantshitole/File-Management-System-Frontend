import React, { useEffect, useState } from 'react';
import Modal from '../Modal';
import { FolderPlus } from 'react-feather';
import './CreateFolderModal.scss';
import { setRefreshData } from '../../../store/slices/folderSlice';
import { useDispatch } from 'react-redux';
import api from '../../../api/axios';

const CreateFolderModal = React.memo(({ isOpen, onClose, isUpdate = false, folder }) => {
  const [name, setName] = useState(folder?.name || '');
  const [description, setDescription] = useState(folder?.description || '');
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    setName(isUpdate ? folder?.name || '' : '');
    setDescription(isUpdate ? folder?.description || '' : '');
  }, [folder, isUpdate]);

  const handleSubmit = e => {
    e.preventDefault();

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

    let apiUrl = '/folders/create';
    let apiMethod = 'post';
    let postData = { name, description, parent_id: folder?.id };
    if (isUpdate && folder) {
      apiUrl = '/folders/update/' + folder.id;
      apiMethod = 'put';
      postData = { name, description, id: folder.id, parent_id: folder.parent_id };
    }
    api[apiMethod](apiUrl, postData)
      .then(response => {
        dispatch(setRefreshData(true));
        setName('');
        setDescription('');
        setErrors({});
        onClose();
      })
      .catch(error => {
        console.error('Error creating folder:', error);
      });
  };

  const handleCancel = () => {
    setName('');
    setDescription('');
    setErrors({});
    onClose();
  };

  const modalFooter = (
    <>
      <button className="btn btn-secondary" onClick={handleCancel}>
        Cancel
      </button>
      <button className="btn btn-primary" onClick={handleSubmit}>
        {isUpdate ? 'Update' : 'Create'}
      </button>
    </>
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isUpdate ? 'Update Folder' : 'Create Folder'}
      footer={modalFooter}
    >
      <form className="create-folder-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="folder-name">Name</label>
          <input
            id="folder-name"
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
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
            onChange={e => setDescription(e.target.value)}
            placeholder="Enter folder description"
            rows={3}
          />
          {errors.description && <div className="error-message">{errors.description}</div>}
        </div>
      </form>
    </Modal>
  );
});

export default CreateFolderModal;
