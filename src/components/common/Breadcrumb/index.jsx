import React, { Fragment } from 'react';
import { ChevronLeft } from 'react-feather';
import { selectAllFolders, selectCurrentFolder } from '../../../store/slices/folderSlice';
import { useSelector } from 'react-redux';
import { getbreadcrumb } from '../../../utils';

const Breadcrumb = () => {
  const folders = useSelector(selectAllFolders);
  const currentFolder = useSelector(selectCurrentFolder);
  let currentFolderPath = currentFolder && currentFolder.type === 'folder'   ? currentFolder.path.split(',').map(Number) : [];
  const breadcrumb = getbreadcrumb(folders, currentFolderPath);
  return (<div className="header__navigation">
    <button className="header__back-button">
      <ChevronLeft size={20} />
    </button>
    <div className="header__breadcrumb">
      {breadcrumb.map((item, index) => (
        item.id !== currentFolder?.id ? <Fragment key={item.id}>
          <span className="header__breadcrumb-item">
            {item.name}
          </span>
          <span className="header__breadcrumb-separator">&gt;</span>

        </Fragment> : <Fragment key={item.id}>
          <span className="header__breadcrumb-item header__breadcrumb-item--active">{item.name}</span>
        </Fragment>

      ))}
    </div>
  </div>

  );
};

export default Breadcrumb; 