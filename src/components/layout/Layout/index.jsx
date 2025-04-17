import React from 'react';
import LeftPanel from '../../navigation/LeftPanel';
import Sidebar from '../../navigation/Sidebar';
import MainContent from '../MainContent';
import Header from '../Header';
import '../../../styles/components/layout/_layout.scss';

const Layout = () => {
  return (
    <div className="layout">
      <LeftPanel />
      <div className="layout__container">
        <Sidebar />
        <div className="layout__main">
          <Header />
          <MainContent />
        </div>
      </div>
    </div>
  );
};

export default Layout; 