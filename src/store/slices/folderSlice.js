import { createSlice } from '@reduxjs/toolkit';
import { getCurrentFolderExpanded } from '../../utils';

// Initial state
const initialState = {
  folders: [],
  uploadFileId: null,
  refreshData: true,
  folderCount: 0,
  fileCount: 0,
  selectedFolder: null,
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
    setFolders(state, action) {
      const { folders, counts } = action.payload;
      state.folders = folders;
      state.refreshData = false;
      state.folderCount = counts.total_folders;
      state.fileCount = counts.total_files;
      state.selectedFolder = null 
    },
    setRefreshData: (state, action) => {
      state.refreshData = action.payload;
    },
    setCurrentFolderExpanded: (state, action) => {
      const folders = getCurrentFolderExpanded(
        state.folders,
        action.payload,
        action.payload.path.split(',')
      );
      state.folders = folders;
    },
  },
});

// Export actions
export const {
  setSelectedFolder,
  setCurrentPath,
  setFolders,
  setRefreshData,
  setCurrentFolderExpanded,
} = folderSlice.actions;

// Export selectors
export const selectAllFolders = state => state.folder.folders;
export const selectCurrentFolder = state => state.folder.selectedFolder;
export const selectRefreshData = state => state.folder.refreshData;
export const selectFolderCount = state => state.folder.folderCount;
export const selectFileCount = state => state.folder.fileCount;
// Export reducer
export default folderSlice.reducer;
