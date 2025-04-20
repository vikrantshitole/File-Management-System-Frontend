import React, { useCallback, useState } from 'react';
import './FileList.scss';
import FileListItem from '../FileListItem';
import UploadDocumentModal from '../../Modals/UploadDocumentModal/UploadDocumentModal';
import CreateFolderModal from '../../Modals/CreateFolderModal/CreateFolderModal';

const FileList = ({ files }) => {
  const [isUploadFileModalOpen, setIsUploadFileModalOpen] = useState(false);
  const [isCreateFolderModalOpen, setIsCreateFolderModalOpen] = useState(false);
  const [isUpdateFolder, setIsUpdateFolder] = useState(false);
  const [file, setFile] = useState(null);

  const handleUploadFile = useCallback(item => {
    setFile(item);
    setIsUploadFileModalOpen(true);
  }, []);

  const handleCreateFolder = useCallback(item => {
    setIsCreateFolderModalOpen(true);
    setIsUpdateFolder(false);
    setFile(item);
  }, []);

  const handleUpdateFolder = useCallback(item => {
    setFile(item);
    setIsUpdateFolder(true);
    setIsCreateFolderModalOpen(true);
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
          {files.map(child => (
            <FileListItem
              key={child.type === 'folder' ? child.id : child.id + child.file_path}
              file={child}
              onUploadFile={handleUploadFile}
              onCreateFolder={handleCreateFolder}
              onUpdateFolder={handleUpdateFolder}
            />
          ))}
        </tbody>
      </table>

      <UploadDocumentModal
        isOpen={isUploadFileModalOpen}
        folderId={file?.id}
        onClose={() => setIsUploadFileModalOpen(false)}
      />
      <CreateFolderModal
        isOpen={isCreateFolderModalOpen || isUpdateFolder}
        folder={file}
        isUpdate={isUpdateFolder}
        onClose={() => {
          setIsCreateFolderModalOpen(false);
          setIsUpdateFolder(false);
          setFile(null);
        }}
      />
    </div>
  );
};

export default FileList;
