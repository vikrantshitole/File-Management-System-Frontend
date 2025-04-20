import React, { useCallback, useEffect, useState } from 'react';
import FileList from '../../content/FileList';
import './MainContent.scss';
import { useSelector } from 'react-redux';
import api from '../../../api/axios';
import { useDispatch } from 'react-redux';
import { selectAllFolders, selectRefreshData, setFolders } from '../../../store/slices/folderSlice';
import Pagination from '../../common/Pagination';
const MainContent = ({ filterData }) => {
  const files = useSelector(selectAllFolders);
  const refreshData = useSelector(selectRefreshData);
  const [pagination, setPagination] = useState({
    page: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 10,
  });
  const dispatch = useDispatch();
  const { page: currentPage, totalPages, itemsPerPage } = pagination;
  useEffect(() => {
    const fetchData = async () => {
      try {
        let query = `page=${currentPage}&limit=${itemsPerPage}`;
        let queryParams = { page: currentPage, limit: itemsPerPage };
        const { name, description, date } = filterData;
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
        const { data, counts, pagination } = response.data;

        dispatch(setFolders({ folders: data, counts }));
        setPagination(prev => ({
          ...prev,
          page: pagination.page,
          totalPages: pagination.totalPages,
          totalItems: pagination.total,
          itemsPerPage: pagination.limit,
        }));
      } catch (error) {
        console.error('Error fetching folder hierarchy:', error);
        return [];
      }
    };

    fetchData();
  }, [refreshData, currentPage, filterData]);

  const handlePageChange = useCallback(page => {
    setPagination(prev => ({ ...prev, page }));
  }, []);

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
