import React, { useEffect, useState } from 'react';
import './FileViewer.scss';
import { useSelector } from 'react-redux';
import { selectCurrentFile } from '../../../store/slices/fileSlice';

const FileViewer = () => {
  const file = useSelector(selectCurrentFile);
  const [textContent, setTextContent] = useState('');

  useEffect(() => {
    const fetchTextFile = async () => {
      if (!file || !file.file_path) return;

      const extension = file.file_path.split('.').pop().toLowerCase();
      const fileUrl = import.meta.env.VITE_API_IMAGE_URL + file.file_path;

      if (['txt', 'csv', 'json', 'log'].includes(extension)) {
        try {
          const response = await fetch(fileUrl);
          const text = await response.text();
          setTextContent(text);
        } catch (error) {
          setTextContent('Failed to load text file.');
        }
      }
    };

    fetchTextFile();
  }, [file]);

  if (!file) {
    return null;
  }

  const extension = file.file_path.split('.').pop().toLowerCase();
  const fileUrl = import.meta.env.VITE_API_IMAGE_URL + file.file_path;

  return (
    <div className="file-viewer">
      {['png', 'jpg', 'jpeg', 'gif', 'svg'].includes(extension) && (
        <img src={fileUrl} alt="Preview" className="file-viewer__image" />
      )}

      {extension === 'pdf' && (
        <iframe
          src={fileUrl}
          title="PDF Viewer"
          width="100%"
          height="100%"
          className="file-viewer__iframe"
        />
      )}

      {['txt'].includes(extension) && (
        <pre className="file-viewer__text">{textContent}</pre>
      )}

      {!['png', 'jpg', 'jpeg', 'gif', 'pdf', 'txt','svg'].includes(extension) && (
        <div className="file-viewer__message">Unsupported file type</div>
      )}
    </div>
  );
};

export default FileViewer;
