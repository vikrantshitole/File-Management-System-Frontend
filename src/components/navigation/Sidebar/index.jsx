import React from 'react';
import { Vector, GoogleDocs } from '../../common/icons';
import FolderTree from '../FolderTree';
import './Sidebar.scss';
import { useSelector } from 'react-redux';
import { selectFileCount, selectFolderCount } from '../../../store/slices/folderSlice';

const Sidebar = () => {
  const folderCount = useSelector(selectFolderCount);
  const fileCount = useSelector(selectFileCount);
  return (
    <aside className="sidebar">
      <div className="sidebar__section">
        <h2 className="sidebar__title">Folders & Documents</h2>
        <div className="sidebar__stats">
          <div className="sidebar__stat">
            <Vector size={16} className="sidebar__stat-icon" />
            <div className="sidebar__stat-content">
              <span className="sidebar__stat-label">Folders</span>
              <span className="sidebar__stat-count">{folderCount}+</span>
            </div>
          </div>
          <div className="sidebar__stat">
            <GoogleDocs size={16} className="sidebar__stat-icon" />
            <div className="sidebar__stat-content">
              <span className="sidebar__stat-label">Documents</span>
              <span className="sidebar__stat-count">{fileCount}+</span>
            </div>
          </div>
        </div>
      </div>
      <div className="sidebar__content">
        <FolderTree />
      </div>
    </aside>
  );
};

export default Sidebar; 