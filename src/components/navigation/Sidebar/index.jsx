import React from 'react';
import { FolderIcon, FileIcon } from '../../common/icons';
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
            <FolderIcon size={'large'} className="sidebar__stat-icon" />
            <div className="sidebar__stat-content">
              <span className="sidebar__stat-label">Folders</span>
              <span className="sidebar__stat-count">{folderCount}{folderCount>200&&'+'}</span>
            </div>
          </div>
          <div className="sidebar__stat">
            <FileIcon size={16} className="sidebar__stat-icon" />
            <div className="sidebar__stat-content">
              <span className="sidebar__stat-label">Documents</span>
              <span className="sidebar__stat-count">{fileCount}{fileCount>200&&'+'}</span>
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