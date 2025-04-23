import React, { useState, useCallback, useMemo } from 'react';
import CreateFolderModal from '@modals/CreateFolderModal/CreateFolderModal';
import { ChevronRight, Plus } from 'react-feather';
import { GoogleDocs, Vector } from '@components/common/icons';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectAllFolders,
  selectCurrentFolder,
  setCurrentFolderExpanded,
  setSelectedFolder,
} from '@store/slices/folderSlice';
import { getParentFolderDetails } from '@utils';
import { selectCurrentFile, setCurrentFile } from '@store/slices/fileSlice';

const FolderTreeItem = React.memo(({ folder, level = 0 }) => {
  const [isCreateFolderModalOpen, setIsCreateFolderModalOpen] = useState(false);
  const dispatch = useDispatch();
  const folders = useSelector(selectAllFolders);
  const currentFolder = useSelector(selectCurrentFolder);
  const currentFile = useSelector(selectCurrentFile);

  const handleToggle = useCallback(
    e => {
      e.stopPropagation();
      if (folder.type === 'folder') {
        dispatch(setCurrentFolderExpanded(folder));
      }
      if (folder.type === 'file') {
        const newFile = folder.id === currentFile?.id ? null : folder;
        dispatch(setCurrentFile(newFile));
      }
      let changeFile = folder;
      if ((folder.id === currentFolder?.id || folder.expanded) && folder.type === 'folder') {
        changeFile = getParentFolderDetails(folders, folder, folder.path.split(',').map(Number));
      }
      dispatch(setSelectedFolder(changeFile));
    },
    [folder, currentFile, currentFolder, folders, dispatch]
  );

  const handleAddFolder = useCallback(e => {
    e.stopPropagation();
    setIsCreateFolderModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsCreateFolderModalOpen(false);
  }, []);

  const itemStyle = useMemo(
    () => ({
      marginLeft: `${level * 1.5}rem`,
    }),
    [level]
  );

  const itemContent = useMemo(
    () => (
      <div
        className={`folder-tree__item-content ${folder.expanded ? 'folder-tree__item-content--expanded' : ''}`}
        style={itemStyle}
        onClick={handleToggle}
      >
        <div className="folder-tree__item-left">
          <button className="folder-tree__toggle">
            <ChevronRight size={14} strokeWidth={2.5} />
          </button>
          <div className="folder-tree__icon">
            {folder.type === 'folder' ? <Vector size={18} /> : <GoogleDocs size={18} />}
          </div>
          <span className="folder-tree__label">{folder.name}</span>
        </div>
        <button
          className="folder-tree__add"
          disabled={folder.type === 'file'}
          onClick={handleAddFolder}
          title="Add Folder"
        >
          <Plus size={16} strokeWidth={2.5} />
        </button>
      </div>
    ),
    [folder, itemStyle, handleToggle, handleAddFolder]
  );

  const childrenContent = useMemo(() => {
    if (!folder.expanded || !folder.children) return null;

    return (
      <div className="folder-tree__children">
        {folder.children.map(child => (
          <FolderTreeItem
            key={child.type === 'folder' ? child.id : child.id + child.file_path}
            folder={child}
            level={level + 1}
          />
        ))}
      </div>
    );
  }, [folder, level]);

  return (
    <div className="folder-tree__item">
      {itemContent}
      {childrenContent}
      <CreateFolderModal
        isOpen={isCreateFolderModalOpen}
        onClose={handleCloseModal}
        folder={folder}
      />
    </div>
  );
});

FolderTreeItem.displayName = 'FolderTreeItem';

export default FolderTreeItem;
