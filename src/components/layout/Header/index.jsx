import React from 'react';
import Breadcrumb from '../../common/Breadcrumb';
import ActionButtons from '../../common/ActionButtons';

const Header = () => {
  return (
    <div className="header">
      <div className="header-left">
        <button className="back-button">
          <span>←</span>
        </button>
        <Breadcrumb />
      </div>
      <ActionButtons />
    </div>
  );
};

export default Header; 