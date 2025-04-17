import React, { useState } from 'react';
import { MoreVertical } from 'react-feather';
import { Vector, GoogleDocs } from '../../common/icons';
import './FileList.scss';

const FileListItem = ({ file, level = 0 }) => {
  const [isExpanded, setIsExpanded] = useState(false);

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

  const isFolder = file.children && file.children.length > 0;

  return (
    <>
        <tr className="file-list__row">
        <td className="file-list__cell file-list__cell--icon" style={{ paddingLeft: `${level ? level * 30: 10}px` }}>
      <span onClick={() => isFolder && setIsExpanded(!isExpanded)} style={{ cursor: isFolder ? 'pointer' : 'default' }}>

        {file.type === 'folder' ? (
          <Vector size={20} />
        ) : (
          <GoogleDocs size={20} />
        )}
      </span>
      </td>
      <td className="file-list__cell file-list__cell--name">
        {file.name}
      </td>
      <td className="file-list__cell file-list__cell--description">
        {file.description}
      </td>
      <td className="file-list__cell file-list__cell--date">
        {formatDate(file.created_at)}
      </td>
      <td className="file-list__cell file-list__cell--date">
        {formatDate(file.updated_at)}
      </td>
      <td className="file-list__cell file-list__cell--actions">
        <button className="file-list__action-button">
          <MoreVertical size={16} />
        </button>
      </td>
    </tr>
    
      {isExpanded &&
        file.children.map((child) => (
          <FileListItem key={child.id} file={child} level={level + 1} />
        ))}

    
    </>
  
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
          {files.map((child) => (
          <FileListItem key={child.id} file={child}/>
        ))}
        </tbody>
      </table>
    </div>
  );
};

export default FileList; 