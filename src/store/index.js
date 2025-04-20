import { configureStore } from '@reduxjs/toolkit';
import folderReducer from './slices/folderSlice';
import fileReducer from './slices/fileSlice';

export const store = configureStore({
  reducer: {
    folder: folderReducer,
    file: fileReducer,
  },
});

export default store;
