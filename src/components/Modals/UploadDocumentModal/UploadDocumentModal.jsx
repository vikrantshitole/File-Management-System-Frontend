import React, { useState, useCallback, useEffect, useRef } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, X } from 'react-feather';
import Modal from '../Modal';
import './UploadDocumentModal.scss';
import api from '../../../api/axios';
import UploadProgressModal from '../UploadProgressModal/UploadProgressModal';
import { useDispatch, useSelector } from 'react-redux';
import { selectUploadFileId, setUploadFileId } from '../../../store/slices/folderSlice';

const UploadDocumentModal = ({ isOpen, onClose, folderId=null }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [progressData, setProgressData] = useState(null);
  const [error, setError] = useState(null);
  const uploadFileId = useSelector(selectUploadFileId);
  const dispatch = useDispatch();
  const eventSourceRef = useRef(null);
  const completionTimeoutRef = useRef(null);

  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles?.length > 0) {
      setSelectedFile(acceptedFiles[0]);
      setError(null);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    accept: {
      'application/pdf': ['.pdf'],
      'text/plain': ['.txt'],
      'image/png': ['.png'],
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/gif': ['.gif'],
    }
  });

  const cleanupEventSource = useCallback(() => {
    if (eventSourceRef.current) {
      eventSourceRef.current.close();
      eventSourceRef.current = null;
    }
    if (completionTimeoutRef.current) {
      clearTimeout(completionTimeoutRef.current);
      completionTimeoutRef.current = null;
    }
  }, []);

  const handleUpload = async () => {
    if (!selectedFile) return;

    try {
      setError(null);
      const postData = new FormData();
      postData.append('file', selectedFile);
      if (folderId) {
        postData.append('folder_id', folderId);
      }
      const response = await api.post('/files/upload', postData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      });

      if (response.data?.uploadId) {
        console.log(
          'response.data.uploadId',
        );
        sessionStorage.setItem('uploadFileId', response.data.uploadId);
        dispatch(setUploadFileId(response.data.uploadId));
      } else {
        throw new Error('No upload ID received');
      }
    } catch (error) {
      console.error('Upload error:', error);
      setError('Failed to start upload. Please try again.');
      cleanupEventSource();
      setProgressData(null);
      setSelectedFile(null);
      console.log('error in handleUpload setUploadFileId(null)' );
      
      dispatch(setUploadFileId(null));
    }
  };

  const handleCompletion = useCallback(() => {
    // Store the last progress data
    setProgressData(prev => ({ ...prev, status: 'completed' }));
    
    // Set a timeout to clean up
    completionTimeoutRef.current = setTimeout(() => {
      cleanupEventSource();
      setProgressData(null);
      setSelectedFile(null);
      dispatch(setUploadFileId(null));
      dispatch(setRefreshData(true));
      sessionStorage.removeItem('uploadFileId');
    }, 1000);
  }, [cleanupEventSource, dispatch]);

  const initializeEventSource = useCallback((id) => {
    try {
      cleanupEventSource();

      const baseUrl = import.meta.env.VITE_API_BASE_URL?.replace(/\/$/, '') || '';
      const url = `${baseUrl}/files/progress/${id}`;

      const eventSource = new EventSource(url);
      eventSourceRef.current = eventSource;

      let lastProgressData = null;

      eventSource.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          lastProgressData = data;
          
          if (data.status === 'completed') {
            setProgressData(data);
            handleCompletion();
          } else if (data.status === 'uploading') {
            setProgressData(data);
          } else if (data.status === 'error') {
            throw new Error(data.message || 'Upload failed');
          }
        } catch (error) {
          console.error('Error processing progress data:', error);
          // If we have last progress data and it was successful, consider it completed
          if (lastProgressData && lastProgressData.progress === 100) {
            setProgressData(lastProgressData);
            handleCompletion();
          } else {
            setError('Error processing upload progress');
            cleanupEventSource();
            setProgressData(null);
            setSelectedFile(null);
            dispatch(setUploadFileId(null));
          }
        }
      };

      eventSource.onerror = (error) => {
        // If we have last progress data and it was successful, consider it completed
        if (lastProgressData && lastProgressData.progress === 100) {
            setProgressData(lastProgressData);
            handleCompletion();
        } else {
          console.error('EventSource error:', error);
          setError('Lost connection to upload progress. Please try again.');
          cleanupEventSource();
          setProgressData(null);
          setSelectedFile(null);
          dispatch(setUploadFileId(null));
        }
      };

    } catch (error) {
      console.error('Error setting up EventSource:', error);
      setError('Failed to monitor upload progress');
      cleanupEventSource();
      setProgressData(null);
      setSelectedFile(null);
      dispatch(setUploadFileId(null));
    }
  }, [cleanupEventSource, dispatch, handleCompletion]);

  useEffect(() => {
    console.log('uploadFileId', uploadFileId);
    if (uploadFileId) {
      initializeEventSource(uploadFileId);
    }
    return cleanupEventSource;
  }, [uploadFileId, initializeEventSource, cleanupEventSource]);

  useEffect(() => {
    if (!isOpen) {
      cleanupEventSource();
      setProgressData(null);
      setSelectedFile(null);
      setError(null);
      dispatch(setUploadFileId(null));
    }
    const id = sessionStorage.getItem('uploadFileId');
    if (id) {
      initializeEventSource(id)
      dispatch(setUploadFileId(id));
    }
  }, [isOpen, dispatch, cleanupEventSource]);

  const handleClose = () => {
    cleanupEventSource();
    setProgressData(null);
    setSelectedFile(null);
    setError(null);
    dispatch(setUploadFileId(null));
    onClose();
  };

  const modalFooter = (
    <div className="upload-modal__footer">
      <button
        className="upload-modal__button upload-modal__button--secondary"
        onClick={handleClose}
      >
        Cancel
      </button>
      <button
        className="upload-modal__button upload-modal__button--primary"
        onClick={handleUpload}
        disabled={!selectedFile}
      >
        Upload
      </button>
    </div>
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Upload Document"
      footer={modalFooter}
    >
      {!progressData && uploadFileId === null && (
          <div className="upload-modal__content">
            <div 
              {...getRootProps()} 
              className={`upload-modal__dropzone ${isDragActive ? 'upload-modal__dropzone--active' : ''}`}
            >
              <input {...getInputProps()} />
              <div className="upload-modal__dropzone-content">
                <div className="upload-modal__icon">
                  <Upload size={24} />
                </div>
                <p className="upload-modal__text">
                  {isDragActive ? 'Drop the file here' : 'Browse document'}
                </p>
                {selectedFile && (
                  <p className="upload-modal__file-name">
                    {selectedFile.name}
                  </p>
                )}
              </div>
            </div>

            {error && (
              <p className="upload-modal__error">{error}</p>
            )}
          </div>
        )}

        {(uploadFileId && progressData && progressData.status == 'uploading') && (
          <UploadProgressModal 
            progress={progressData.progress} 
            fileName={progressData.file.originalname} 
            fileSize={progressData.file.size}
          />
        )}
    </Modal>
  );
};

export default UploadDocumentModal; 