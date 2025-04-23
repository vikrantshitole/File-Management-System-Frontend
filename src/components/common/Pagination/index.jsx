import React, { useCallback, useMemo } from 'react';
import { ChevronLeft, ChevronRight } from 'react-feather';
import '@styles/Pagination.scss';

const Pagination = React.memo(
  ({ currentPage, totalPages, onPageChange, className = '' }) => {
    const maxVisiblePages = 5;

    const { startPage, endPage, pageNumbers } = useMemo(() => {
      let start = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
      let end = Math.min(totalPages, start + maxVisiblePages - 1);

      if (end - start + 1 < maxVisiblePages) {
        start = Math.max(1, end - maxVisiblePages + 1);
      }

      const pages = [];
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      return { startPage: start, endPage: end, pageNumbers: pages };
    }, [currentPage, totalPages]);

    const handlePageChange = useCallback(
      page => {
        if (page >= 1 && page <= totalPages && page !== currentPage) {
          onPageChange(page);
        }
      },
      [currentPage, totalPages, onPageChange]
    );

    if (totalPages <= 1) return null;

    return (
      <div className={`pagination ${className}`}>
        <button
          className={`pagination__button pagination__button--prev ${
            currentPage === 1 ? 'pagination__button--disabled' : ''
          }`}
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <ChevronLeft size={16} />
        </button>

        {startPage > 1 && (
          <>
            <button className="pagination__button" onClick={() => handlePageChange(1)}>
              1
            </button>
            {startPage > 2 && <span className="pagination__ellipsis">...</span>}
          </>
        )}

        {pageNumbers.map(page => (
          <button
            key={page}
            className={`pagination__button ${
              page === currentPage ? 'pagination__button--active' : ''
            }`}
            onClick={() => handlePageChange(page)}
          >
            {page}
          </button>
        ))}

        {endPage < totalPages && (
          <>
            {endPage < totalPages - 1 && <span className="pagination__ellipsis">...</span>}
            <button className="pagination__button" onClick={() => handlePageChange(totalPages)}>
              {totalPages}
            </button>
          </>
        )}

        <button
          className={`pagination__button pagination__button--next ${
            currentPage === totalPages ? 'pagination__button--disabled' : ''
          }`}
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          <ChevronRight size={16} />
        </button>
      </div>
    );
  },
  (prevProps, nextProps) => {
    return (
      prevProps.currentPage === nextProps.currentPage &&
      prevProps.totalPages === nextProps.totalPages &&
      prevProps.className === nextProps.className
    );
  }
);

Pagination.displayName = 'Pagination';

export default Pagination;
