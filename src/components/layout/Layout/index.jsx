import React from 'react';
import Sidebar from '../../navigation/Sidebar';
import MainContent from '../MainContent';
import '../../../styles/components/layout/_layout.scss';

const Layout = () => {
  return (
    <div className="layout">
      <Sidebar />
      <MainContent />
    </div>
  );
};

export default Layout; 