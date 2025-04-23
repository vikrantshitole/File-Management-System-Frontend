import React, { useMemo } from 'react';
import { FolderIcon, FileIcon } from '@components/common/icons';
import FolderTree from '@components/FolderTree';
import '@styles/Sidebar.scss';
import { useSelector } from 'react-redux';
import { selectFileCount, selectFolderCount } from '@store/slices/folderSlice';

const Sidebar = React.memo(
  ({ sideBarOpen }) => {
    const folderCount = useSelector(selectFolderCount);
    const fileCount = useSelector(selectFileCount);

    const folderStats = useMemo(
      () => (
        <div className="sidebar__stat">
          <FolderIcon size={'large'} className="sidebar__stat-icon" />
          <div className="sidebar__stat-content">
            <span className="sidebar__stat-label">Folders</span>
            <span className="sidebar__stat-count">
              {folderCount}
              {folderCount > 200 && '+'}
            </span>
          </div>
        </div>
      ),
      [folderCount]
    );

    const fileStats = useMemo(
      () => (
        <div className="sidebar__stat">
          <FileIcon size={16} className="sidebar__stat-icon" />
          <div className="sidebar__stat-content">
            <span className="sidebar__stat-label">Documents</span>
            <span className="sidebar__stat-count">
              {fileCount}
              {fileCount > 200 && '+'}
            </span>
          </div>
        </div>
      ),
      [fileCount]
    );

    return (
      <aside className={`sidebar ${sideBarOpen ? '' : 'sidebar--closed'}`}>
        <div className="sidebar__section">
          <h2 className="sidebar__title">Folders & Documents</h2>
          <div className="sidebar__stats">
            {folderStats}
            {fileStats}
          </div>
        </div>
        <div className="sidebar__content">
          <FolderTree />
        </div>
      </aside>
    );
  },
  (prevProps, nextProps) => {
    return prevProps.sideBarOpen === nextProps.sideBarOpen;
  }
);

Sidebar.displayName = 'Sidebar';

export default Sidebar;
