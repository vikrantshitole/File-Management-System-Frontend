import React from 'react';
import FileList from '../../content/FileList';
import './MainContent.scss';

const MainContent = () => {
  // Mock data - replace with actual data from your application
  const files = [
    {
      id: 1,
      name: 'Project Proposal.pdf',
      type: 'file',
      description: 'Final version of the project proposal document',
      createdAt: '2024-03-17T23:30:00Z',
      updatedAt: '2024-03-17T23:30:00Z'
    },
    {
      id: 2,
      name: 'Technical Requirements',
      type: 'folder',
      description: 'Collection of technical requirement documents',
      createdAt: '2024-03-16T14:20:00Z',
      updatedAt: '2024-03-17T09:15:00Z'
    },
    {
      id: 3,
      name: 'Meeting Notes.docx',
      type: 'file',
      description: 'Notes from the last team meeting',
      createdAt: '2024-03-15T10:00:00Z',
      updatedAt: '2024-03-15T10:00:00Z'
    }
  ];

  return (
    <main className="main-content">
      <FileList files={files} />
    </main>
  );
};

export default MainContent; 