import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  files: [
    {
      id: '1',
      name: 'mission_report.pdf',
      type: 'pdf',
      size: '2.5 MB',
      modified: '2024-03-20',
      path: '/Mission_Logs/mission_report.pdf'
    },
    {
      id: '2',
      name: 'telemetry_data.csv',
      type: 'csv',
      size: '1.8 MB',
      modified: '2024-03-19',
      path: '/Mission_Logs/Raw_Telemetry/telemetry_data.csv'
    },
    {
      id: '3',
      name: 'analysis_results.xlsx',
      type: 'xlsx',
      size: '3.2 MB',
      modified: '2024-03-18',
      path: '/Mission_Logs/Processed_Data/analysis_results.xlsx'
    }
  ],
  selectedFiles: [],
  sortBy: 'name',
  sortOrder: 'asc'
};

const fileSlice = createSlice({
  name: 'file',
  initialState,
  reducers: {
    setSelectedFiles: (state, action) => {
      state.selectedFiles = action.payload;
    },
    addFile: (state, action) => {
      state.files.push(action.payload);
    },
    removeFile: (state, action) => {
      state.files = state.files.filter(file => file.id !== action.payload);
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
    },
    setSortOrder: (state, action) => {
      state.sortOrder = action.payload;
    }
  }
});

export const { 
  setSelectedFiles, 
  addFile, 
  removeFile, 
  setSortBy, 
  setSortOrder 
} = fileSlice.actions;

export default fileSlice.reducer; 