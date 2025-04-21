import React, { Fragment, useMemo, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'react-feather';
import { selectAllFolders, selectCurrentFolder } from '../../../store/slices/folderSlice';
import { useSelector } from 'react-redux';
import { getbreadcrumb } from '../../../utils';

const Breadcrumb = React.memo(
  ({ setSideBarOpen, sideBarOpen }) => {
    const folders = useSelector(selectAllFolders);
    const currentFolder = useSelector(selectCurrentFolder);

    const breadcrumb = useMemo(() => {
      let currentFolderPath =
        currentFolder && currentFolder.type === 'folder'
          ? currentFolder.path.split(',').map(Number)
          : [];
      return getbreadcrumb(folders, currentFolderPath);
    }, [folders, currentFolder]);

    const handleToggleSidebar = useCallback(() => {
      setSideBarOpen(prev => !prev);
    }, [setSideBarOpen]);

    const renderBreadcrumbItems = useMemo(() => {
      if (!breadcrumb || breadcrumb.length === 0) {
        return <span className="header__breadcrumb-item">File Management System</span>;
      }

      return breadcrumb.map((item, index) =>
        item.id !== currentFolder?.id ? (
          <Fragment key={item.id}>
            <span className="header__breadcrumb-item">{item.name}</span>
            <span className="header__breadcrumb-separator">&gt;</span>
          </Fragment>
        ) : (
          <Fragment key={item.id}>
            <span className="header__breadcrumb-item header__breadcrumb-item--active">
              {item.name}
            </span>
          </Fragment>
        )
      );
    }, [breadcrumb, currentFolder]);

    return (
      <div className="header__navigation">
        <button className="header__back-button" onClick={handleToggleSidebar}>
          {sideBarOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
        </button>
        <div className="header__breadcrumb">{renderBreadcrumbItems}</div>
      </div>
    );
  },
  (prevProps, nextProps) => {
    return prevProps.sideBarOpen === nextProps.sideBarOpen;
  }
);

Breadcrumb.displayName = 'Breadcrumb';

export default Breadcrumb;
