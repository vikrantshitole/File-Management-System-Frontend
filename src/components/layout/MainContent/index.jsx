import React, { useEffect } from 'react';
import FileList from '../../content/FileList';
import './MainContent.scss';
import { useSelector } from 'react-redux';
import api from '../../../api/axios';
import { useDispatch } from 'react-redux';
import { selectAllFolders, selectRefreshData, setFolders, selectCurrentPage, selectTotalPages, selectTotalItems, selectItemsPerPage, changeCurrentPage } from '../../../store/slices/folderSlice';
import Pagination from '../../common/Pagination';
const MainContent = ({filterData}) => {
  // Mock data - replace with actual data from your application
  const files = useSelector(selectAllFolders)
  const refreshData = useSelector(selectRefreshData);
  const currentPage = useSelector(selectCurrentPage);
  const totalPages = useSelector(selectTotalPages);
  const itemsPerPage = useSelector(selectItemsPerPage); 
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchData = async () => {
      try {
        let query = `page=${currentPage}&limit=${itemsPerPage}`;
        let queryParams = {page: currentPage, limit: itemsPerPage};
        const {name, description, date} = filterData;
        if (name) {
          query += `&name=${name}`;
          queryParams.name = name;
        }
        if (description) {
          query += `&description=${description}`;
          queryParams.description = description;
        }
        if (date) {
          query += `&date=${date}`;
          queryParams.date = date;
        }
        query = new URLSearchParams(queryParams).toString();
        const response = await api.get(`/folders?${query}`);
        const {data, counts, pagination} =response.data
                
        dispatch(setFolders({ folders: data,counts, pagination }));
      } 
      catch (error) {
        console.error('Error fetching folder hierarchy:', error);
        return [];
      }
    };

    fetchData();
  }, [refreshData,currentPage,filterData]);
  const handlePageChange = (page) => {
    dispatch(changeCurrentPage(page));
  }
  return (
    <main className="main-content">
      <FileList files={files} />

      <Pagination 
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </main>
  );
};

export default MainContent; 