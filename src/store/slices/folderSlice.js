import { createSlice } from '@reduxjs/toolkit';

// Initial state
const initialState = {
  folders: [],
  selectedFolder: null,
  currentPath: '/',
  uploadFileId: null,
  refreshData: true,
  folderCount: 0,
  fileCount: 0,
  pagination : {
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 10
  }
};

// Create the slice
const folderSlice = createSlice({
  name: 'folder',
  initialState,
  reducers: {
    setSelectedFolder: (state, action) => {
      state.selectedFolder = action.payload;
    },
    setCurrentPath: (state, action) => {
      state.currentPath = action.payload;
    },
    addFolder: (state, action) => {
      const { parentPath, newFolder } = action.payload;
      const addFolderToPath = (folders, targetPath) => {
        return folders.map(folder => {
          if (folder.path === targetPath) {
            return {
              ...folder,
              children: [...folder.children, newFolder]
            };
          }
          if (folder.children.length > 0) {
            return {
              ...folder,
              children: addFolderToPath(folder.children, targetPath)
            };
          }
          return folder;
        });
      };
      state.folders = addFolderToPath(state.folders, parentPath);
    },
    removeFolder: (state, action) => {
      const { folderId } = action.payload;
      const removeFromFolders = (items) => {
        for (let i = 0; i < items.length; i++) {
          if (items[i].id === folderId) {
            items.splice(i, 1);
            return true;
          }
          if (items[i].children && removeFromFolders(items[i].children)) {
            return true;
          }
        }
        return false;
      };
      removeFromFolders(state.folders);
    },
    setFolders(state, action) {
      const { folders ,counts,pagination} = action.payload;
      state.folders = folders;
      state.refreshData = false;
      state.folderCount = counts.total_folders;
      state.fileCount = counts.total_files;
      state.pagination = {
        currentPage: pagination.page,
        totalPages: pagination.totalPages,
        totalItems: pagination.total,
        itemsPerPage: pagination.limit
      }
    },
    setUploadFileId: (state, action) => {
      state.uploadFileId = action.payload;
    },
    setRefreshData: (state, action) => {
      state.refreshData = action.payload;
    },
    changeCurrentPage: (state, action) => {
      state.pagination.currentPage = action.payload;
    }
  },
});

// Export actions
export const {
  setSelectedFolder,
  setCurrentPath,
  addFolder,
  removeFolder,
  setFolders,
  setUploadFileId,
  setRefreshData,
  changeCurrentPage
} = folderSlice.actions;

// Export selectors
export const selectAllFolders = (state) => state.folder.folders;
export const selectCurrentFolder = (state) => state.folder.selectedFolder;
export const selectFolderById = (state, folderId) => 
  state.folders.folders.find(folder => folder.id === folderId);
export const selectFoldersByParentId = (state, parentId) => 
  state.folders.folders.filter(folder => folder.parentId === parentId);
export const selectCurrentPath = (state) => state.folders.currentPath;
export const selectUploadFileId = (state) => state.folder.uploadFileId;
export const selectRefreshData = (state) => state.folder.refreshData;
export const selectFolderCount = (state) => state.folder.folderCount;
export const selectFileCount = (state) => state.folder.fileCount;
export const selectCurrentPage = (state) => state.folder.pagination.currentPage;
export const selectTotalPages = (state) => state.folder.pagination.totalPages;
export const selectTotalItems = (state) => state.folder.pagination.totalItems;
export const selectItemsPerPage = (state) => state.folder.pagination.itemsPerPage;
  // Export reducer
export default folderSlice.reducer; 