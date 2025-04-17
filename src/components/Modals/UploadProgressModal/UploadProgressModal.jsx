import React from 'react';
import './UploadProgressModal.scss';

const UploadProgressModal = ({ progress, fileName, fileSize }) => {
  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="upload-progress">
      <div className="upload-progress__info">
        <span className="upload-progress__filename">{fileName}</span>
        <span className="upload-progress__size">{formatFileSize(fileSize)}</span>
      </div>
      <div className="upload-progress__bar">
        <div 
          className="upload-progress__fill" 
          style={{ width: `${progress}%` }}
        />
      </div>
      <div className="upload-progress__status">
        <span className="upload-progress__percentage">{progress}%</span>
        <span className="upload-progress__text">
          {progress < 100 ? 'Uploading...' : 'Upload complete'}
        </span>
      </div>
    </div>
  );
};

export default UploadProgressModal; 