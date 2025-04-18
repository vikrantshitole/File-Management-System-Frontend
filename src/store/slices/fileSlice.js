import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentFile: null,
  
};

const fileSlice = createSlice({
  name: 'file',
  initialState,
  reducers: {
    setCurrentFile: (state, action) => {
      state.currentFile = action.payload;
    },
  }
});

// Export actions
export const {
  setCurrentFile
} = fileSlice.actions;

// Export selectors
export const selectCurrentFile = (state) => state.file.currentFile;

export default fileSlice.reducer; 