import React from 'react';
import FileList from '../../content/FileList';
import './MainContent.scss';
import { useSelector } from 'react-redux';

const MainContent = () => {
  // Mock data - replace with actual data from your application
  const {folders: files} = useSelector(state=>state.folder)

  return (
    <main className="main-content">
      <FileList files={files} />
    </main>
  );
};

export default MainContent; 