import React, { useCallback, useState } from 'react';
import './FileList.scss';
import FileListItem from '../FileListItem';
import UploadDocumentModal from '../../Modals/UploadDocumentModal/UploadDocumentModal';
import { useDispatch } from 'react-redux';
import { setRefreshData } from '../../../store/slices/folderSlice';
import api from '../../../api/axios';
import CreateFolderModal from '../../Modals/CreateFolderModal';

const FileList = ({ files }) => {
  const [isUploadFileModalOpen, setIsUploadFileModalOpen] = useState(false);
  const [isCreateFolderModalOpen, setIsCreateFolderModalOpen] = useState(false);
  const [isUpdateFolder, setIsUpdateFolder] = useState(false);
  const [selectedFolderId, setSelectedFolderId] = useState(null);
  const [file, setFile] = useState(null);
  const dispatch = useDispatch();
  const handleUploadFile = useCallback(folderId => {
    setSelectedFolderId(folderId);
    setIsUploadFileModalOpen(true);
  }, []);
  const handleCreateFolderSubmit = folderData => {
    let apiUrl = '/folders/create';
    let apiMethod = 'post';
    let postData = { ...folderData, parent_id: file.id };
    if (isUpdateFolder) {
      apiUrl = '/folders/update/' + file.id;
      apiMethod = 'put';
      postData = { ...folderData, id: file.id, parent_id: file.parent_id };
    }
    api[apiMethod](apiUrl, postData)
      .then(response => {
        dispatch(setRefreshData(true));
        setIsCreateFolderModalOpen(false);
        setIsUpdateFolder(false);
      })
      .catch(error => {
        console.error('Error creating folder:', error);
      })
      .finally(() => {
        setFile(null);
      });
  };

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
              onCreateFolder={handleCreateFolderSubmit}
              onUpdateFolder={setIsUpdateFolder}
              setFile={setFile}
            />
          ))}
        </tbody>
      </table>

      <UploadDocumentModal
        isOpen={isUploadFileModalOpen}
        folderId={selectedFolderId}
        onClose={() => setIsUploadFileModalOpen(false)}
      />
      <CreateFolderModal
        isOpen={isCreateFolderModalOpen || isUpdateFolder}
        folder={isUpdateFolder ? file : null}
        onClose={() => {
          setIsCreateFolderModalOpen(false);
          setIsUpdateFolder(false);
          setFile(null);
        }}
        onCreateFolder={handleCreateFolderSubmit}
      />
    </div>
  );
};

export default FileList;
