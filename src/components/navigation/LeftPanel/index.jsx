import React from 'react';
import { Home, Folder, Calendar, Settings, User } from 'react-feather';
import './LeftPanel.scss';

const LeftPanel = () => {
  const menuItems = [
    { icon: Home, label: 'Home' },
    { icon: Folder, label: 'Files' },
    { icon: Calendar, label: 'Calendar' },
    { icon: Settings, label: 'Settings' },
  ];

  return (
    <div className="left-panel">
      <div className="left-panel__menu">
        {menuItems.map((item, index) => (
          <button 
            key={index}
            className={`left-panel__button ${item.label === 'Files' ? 'left-panel__button--active' : ''}`}
            title={item.label}
          >
            <item.icon size={20} />
          </button>
        ))}
      </div>
      <div className="left-panel__profile">
        <button className="left-panel__button" title="Profile">
          <User size={20} />
        </button>
      </div>
    </div>
  );
};

export default LeftPanel; 