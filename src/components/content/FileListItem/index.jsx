import React from 'react';

const FileListItem = ({ file }) => {
  return (
    <tr>
      <td>
        <div className="file-name">
          <span className="icon">{file?.type === 'folder' ? '📁' : '📄'}</span>
          <span>{file?.name}</span>
        </div>
      </td>
      <td>{file?.description}</td>
      <td>{file?.createdAt}</td>
      <td>{file?.updatedAt}</td>
      <td>
        <button className="more-button">⋮</button>
      </td>
    </tr>
  );
};

export default FileListItem; 