import '@styles/Modals/UploadProgressModal.scss';
import React, { useMemo } from 'react';
import { GoogleDocs } from '@components/common/icons';

const UploadProgressModal = ({ progress, fileName, fileSize }) => {
  const size = useMemo(() => {
    if (fileSize === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(fileSize) / Math.log(k));
    return parseFloat((fileSize / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }, [fileSize]);

  return (
    <div className="upload-progress">
      <div className="upload-progress__info">
        <span className="upload-progress__icon">
          <GoogleDocs size={50} />
        </span>
        <div className="upload-progress__details">
          <span className="upload-progress__filename">{fileName}</span>
          <span className="upload-progress__size">{size}</span>
        </div>
      </div>
      <div className="upload-progress__bar">
        <div className="upload-progress__fill" style={{ width: `${progress}%` }} />
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
