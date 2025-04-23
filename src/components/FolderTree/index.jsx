import React, { useMemo } from 'react';
import '@styles/FolderTree.scss';
import { useSelector } from 'react-redux';
import { selectAllFolders } from '@store/slices/folderSlice';
import FolderTreeItem from '@components/FolderTreeItem';

const FolderTree = React.memo(() => {
  const files = useSelector(selectAllFolders);

  const folderItems = useMemo(
    () =>
      files.map(folder => (
        <FolderTreeItem
          key={folder.type === 'folder' ? folder.id : folder.id + folder.file_path}
          folder={folder}
        />
      )),
    [files]
  );

  return <div className="folder-tree">{folderItems}</div>;
});

FolderTree.displayName = 'FolderTree';

export default FolderTree;
