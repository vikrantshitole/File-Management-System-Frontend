import React from 'react';
import { MoreVertical } from 'react-feather';
import { Vector, GoogleDocs } from '../../common/icons';
import './FileList.scss';

const FileListItem = ({ file }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).replace(',', '');
  };

  return (
    <tr className="file-list__row">
      <td className="file-list__cell file-list__cell--icon">
        {file.type === 'folder' ? (
          <Vector size={20} />
        ) : (
          <GoogleDocs size={20} />
        )}
      </td>
      <td className="file-list__cell file-list__cell--name">
        {file.name}
      </td>
      <td className="file-list__cell file-list__cell--description">
        {file.description}
      </td>
      <td className="file-list__cell file-list__cell--date">
        {formatDate(file.createdAt)}
      </td>
      <td className="file-list__cell file-list__cell--date">
        {formatDate(file.updatedAt)}
      </td>
      <td className="file-list__cell file-list__cell--actions">
        <button className="file-list__action-button">
          <MoreVertical size={16} />
        </button>
      </td>
    </tr>
  );
};

const FileList = ({ files }) => {
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
          {files.map((file) => (
            <FileListItem key={file.id} file={file} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FileList; 