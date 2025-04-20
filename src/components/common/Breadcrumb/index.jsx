import React, { Fragment, useMemo } from 'react';
import { ChevronLeft, ChevronRight } from 'react-feather';
import { selectAllFolders, selectCurrentFolder } from '../../../store/slices/folderSlice';
import { useSelector } from 'react-redux';
import { getbreadcrumb } from '../../../utils';

const Breadcrumb = ({ setSideBarOpen, sideBarOpen }) => {
  const folders = useSelector(selectAllFolders);
  const currentFolder = useSelector(selectCurrentFolder);
  const breadcrumb = useMemo(() => {
    let currentFolderPath =
      currentFolder && currentFolder.type === 'folder'
        ? currentFolder.path.split(',').map(Number)
        : [];
    return getbreadcrumb(folders, currentFolderPath);
  }, [folders, currentFolder]);
  return (
    <div className="header__navigation">
      <button className="header__back-button" onClick={() => setSideBarOpen(prev => !prev)}>
        {sideBarOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
      </button>
      <div className="header__breadcrumb">
        {breadcrumb && breadcrumb.length > 0 ? (
          breadcrumb.map((item, index) =>
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
          )
        ) : (
          <span className="header__breadcrumb-item">File Management System</span>
        )}
      </div>
    </div>
  );
};

export default Breadcrumb;
