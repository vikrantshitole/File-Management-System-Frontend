import React, { useCallback, useState, useMemo } from 'react';
import './FileList.scss';
import FileListItem from '../FileListItem';
import UploadDocumentModal from '../../Modals/UploadDocumentModal/UploadDocumentModal';
import CreateFolderModal from '../../Modals/CreateFolderModal/CreateFolderModal';

const FileList = React.memo(({ files }) => {
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

  const handleCloseUploadModal = useCallback(() => {
    setIsUploadFileModalOpen(false);
    setFile(null);
  }, []);

  const handleCloseCreateModal = useCallback(() => {
    setIsCreateFolderModalOpen(false);
    setIsUpdateFolder(false);
    setFile(null);
  }, []);

  const tableHeaders = useMemo(() => (
    <tr>
      <th className="file-list__header file-list__header--icon"></th>
      <th className="file-list__header file-list__header--name">Name</th>
      <th className="file-list__header file-list__header--description">Description</th>
      <th className="file-list__header file-list__header--date">Created At</th>
      <th className="file-list__header file-list__header--date">Updated At</th>
      <th className="file-list__header file-list__header--actions"></th>
    </tr>
  ), []);

  return (
    <div className="file-list">
      <table className="file-list__table">
        <thead>
          {tableHeaders}
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
        onClose={handleCloseUploadModal}
      />
      <CreateFolderModal
        isOpen={isCreateFolderModalOpen || isUpdateFolder}
        folder={file}
        isUpdate={isUpdateFolder}
        onClose={handleCloseCreateModal}
      />
    </div>
  );
});

FileList.displayName = 'FileList';

export default FileList;
