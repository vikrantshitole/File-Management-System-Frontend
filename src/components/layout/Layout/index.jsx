import React from 'react';
import LeftPanel from '../../navigation/LeftPanel';
import Sidebar from '../../navigation/Sidebar';
import MainContent from '../MainContent';
import Header from '../Header';
import '../../../styles/components/layout/_layout.scss';
import FileViewer from '../../content/FileViewer';
import { selectCurrentFile } from '../../../store/slices/fileSlice';
import { useSelector } from 'react-redux';

const Layout = () => {
    const file = useSelector(selectCurrentFile);
  return (
    <div className="layout">
      <LeftPanel />
      <div className="layout__container">
        <Sidebar />
        <div className="layout__main" style={{width: file ? '80%' : '100%'}}>
          <Header />
          <div className="layout__main-content">

          <MainContent />
          <FileViewer />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout; 