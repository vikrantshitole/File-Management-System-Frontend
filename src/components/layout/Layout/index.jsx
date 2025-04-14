import React from 'react';
import Sidebar from '../../navigation/Sidebar';
import MainContent from '../MainContent';

const Layout = () => {
  return (
    <div className="layout">
      <Sidebar />
      <MainContent />
    </div>
  );
};

export default Layout; 