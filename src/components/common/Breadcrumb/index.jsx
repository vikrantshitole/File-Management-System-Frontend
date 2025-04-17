import React from 'react';
import { ChevronLeft } from 'react-feather';

const Breadcrumb = () => {
  return (   <div className="header__navigation">
          <button className="header__back-button">
            <ChevronLeft size={20} />
          </button>
          <div className="header__breadcrumb">
            <span className="header__breadcrumb-item">NSM</span>
            <span className="header__breadcrumb-separator">&gt;</span>
            <span className="header__breadcrumb-item header__breadcrumb-item--active">
              Folders & Documents
            </span>
          </div>
        </div>
  
  );
};

export default Breadcrumb; 