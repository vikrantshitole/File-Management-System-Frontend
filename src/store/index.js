import { configureStore } from '@reduxjs/toolkit';
import folderReducer from './slices/folderSlice';

export const store = configureStore({
  reducer: {
    folder: folderReducer,
  }
});

export default store; 