import React, { useCallback, useEffect, useState, useMemo } from 'react';
import FileList from '../../content/FileList';
import './MainContent.scss';
import { useSelector, useDispatch } from 'react-redux';
import api from '../../../api/axios';
import { selectAllFolders, selectRefreshData, setFolders } from '../../../store/slices/folderSlice';
import Pagination from '../../common/Pagination';

const MainContent = React.memo(
  ({ filterData }) => {
    const files = useSelector(selectAllFolders);
    const refreshData = useSelector(selectRefreshData);
    const dispatch = useDispatch();

    const [pagination, setPagination] = useState({
      page: 1,
      totalPages: 1,
      totalItems: 0,
      itemsPerPage: 10,
    });

    const { page: currentPage, totalPages, itemsPerPage } = pagination;

    const queryParams = useMemo(() => {
      const params = new URLSearchParams();
      params.append('page', currentPage);
      params.append('limit', itemsPerPage);

      const { name, description, date } = filterData;
      if (name) params.append('name', name);
      if (description) params.append('description', description);
      if (date) params.append('date', date);

      return params.toString();
    }, [currentPage, itemsPerPage, filterData]);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await api.get(`/folders?${queryParams}`);
          const { data, counts, pagination: paginationData } = response.data;

          dispatch(setFolders({ folders: data, counts }));
          setPagination(prev => ({
            ...prev,
            page: paginationData.page,
            totalPages: paginationData.totalPages,
            totalItems: paginationData.total,
            itemsPerPage: paginationData.limit,
          }));
        } catch (error) {
          console.error('Error fetching folder hierarchy:', error);
        }
      };

      fetchData();
    }, [queryParams, dispatch, refreshData]);

    const handlePageChange = useCallback(page => {
      setPagination(prev => ({ ...prev, page }));
    }, []);

    const shouldShowPagination = useMemo(() => totalPages > 1, [totalPages]);

    return (
      <div className="main-content">
        <FileList files={files} />
        {shouldShowPagination && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )}
      </div>
    );
  },
  (prevProps, nextProps) => {
    return (
      prevProps.filterData.name === nextProps.filterData.name &&
      prevProps.filterData.description === nextProps.filterData.description &&
      prevProps.filterData.date === nextProps.filterData.date
    );
  }
);

MainContent.displayName = 'MainContent';

export default MainContent;
