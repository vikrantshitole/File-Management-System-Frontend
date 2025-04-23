import React, { useMemo } from 'react';
import { Home, Folder, Calendar, Settings, User } from 'react-feather';
import '@styles/LeftPanel.scss';

const LeftPanel = React.memo(
  () => {
    const menuItems = useMemo(
      () => [
        { icon: Home, label: 'Home' },
        { icon: Folder, label: 'Files' },
        { icon: Calendar, label: 'Calendar' },
        { icon: Settings, label: 'Settings' },
      ],
      []
    );

    const menuButtons = useMemo(
      () =>
        menuItems.map((item, index) => (
          <button
            key={index}
            className={`left-panel__button ${item.label === 'Files' ? 'left-panel__button--active' : ''}`}
            title={item.label}
          >
            <item.icon size={20} />
          </button>
        )),
      [menuItems]
    );

    return (
      <div className="left-panel">
        <div className="left-panel__menu">{menuButtons}</div>
        <div className="left-panel__profile">
          <button className="left-panel__button" title="Profile">
            <User size={20} />
          </button>
        </div>
      </div>
    );
  },
  () => true
);

LeftPanel.displayName = 'LeftPanel';

export default LeftPanel;
