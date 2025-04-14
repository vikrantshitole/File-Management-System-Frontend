import React from 'react';
import FileListItem from '../FileListItem';

const FileList = () => {
  const files = [
    {
      name: 'Mission_Logs',
      type: 'folder',
      description: 'This file includes the most dangerous se...',
      createdAt: '17/03/2025 23:30',
      updatedAt: '17/03/2025 23:30',
    },
    {
      name: 'Satellite_Data',
      type: 'folder',
      description: 'This file includes the most dangerous se...',
      createdAt: '17/03/2025 23:30',
      updatedAt: '17/03/2025 23:30',
    },
    {
      name: 'Open_Source_Tools',
      type: 'folder',
      description: 'This file includes the most dangerous se...',
      createdAt: '17/03/2025 23:30',
      updatedAt: '17/03/2025 23:30',
    }
  ];

  return (
    <div className="file-list">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Created at</th>
            <th>Updated at</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {files.map(file => (
            <FileListItem key={file.name} file={file} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FileList; 