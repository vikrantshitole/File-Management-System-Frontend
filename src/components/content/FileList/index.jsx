import React, { useCallback, useState } from 'react';
import './FileList.scss';
import FileListItem from '../FileListItem';
import UploadDocumentModal from '../../Modals/UploadDocumentModal/UploadDocumentModal';


const FileList = ({ files }) => {
  const [isUploadFileModalOpen, setIsUploadFileModalOpen] = useState(false);
  const [selectedFolderId, setSelectedFolderId] = useState(null);
  const handleUploadFile = useCallback((folderId) => {
    setSelectedFolderId(folderId);
    setIsUploadFileModalOpen(true);
  }, []);

  return (
    <div className="file-list">
      <table className="file-list__table">
        <thead>
          <tr>
            <th className="file-list__header file-list__header--icon"></th>
            <th className="file-list__header file-list__header--name">Name</th>
            <th className="file-list__header file-list__header--description">Description</th>
            <th className="file-list__header file-list__header--date">Created At</th>
            <th className="file-list__header file-list__header--date">Updated At</th>
            <th className="file-list__header file-list__header--actions"></th>
          </tr>
        </thead>
        <tbody>
          {files.map((child) => (
          <FileListItem key={child.type === 'folder' ? child.id : child.id+child.file_path} file={child} onUploadFile={handleUploadFile}/>
        ))}
        </tbody>
      </table>

      <UploadDocumentModal
        isOpen={isUploadFileModalOpen}
        folderId={selectedFolderId}
        onClose={() => setIsUploadFileModalOpen(false)}
      />
    </div>
  );
};

export default FileList; 