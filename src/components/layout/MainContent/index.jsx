import React, { useEffect } from 'react';
import FileList from '../../content/FileList';
import './MainContent.scss';
import { useSelector } from 'react-redux';
import api from '../../../api/axios';
import { useDispatch } from 'react-redux';
import { selectAllFolders, selectRefreshData, setFolders } from '../../../store/slices/folderSlice';
const MainContent = () => {
  // Mock data - replace with actual data from your application
  const files = useSelector(selectAllFolders)
  const refreshData = useSelector(selectRefreshData);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get('/folders?page=1&limit=10');
        const {data, counts} =response.data
        console.log(counts );
                
        dispatch(setFolders({ folders: data,counts }));
      } 
      catch (error) {
        console.error('Error fetching folder hierarchy:', error);
        return [];
      }
    };

    fetchData();
  }, [refreshData]);
  return (
    <main className="main-content">
      <FileList files={files} />
    </main>
  );
};

export default MainContent; 