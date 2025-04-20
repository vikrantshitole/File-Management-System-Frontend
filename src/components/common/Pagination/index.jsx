import React from 'react';
import { ChevronLeft, ChevronRight } from 'react-feather';
import './Pagination.scss';

const Pagination = ({ currentPage, totalPages, onPageChange, className = '' }) => {
  const pages = [];
  const maxVisiblePages = 5;
  let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
  let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
  const getPageNumbers = () => {
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  };

  const handlePageChange = page => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      onPageChange(page);
    }
  };

  if (totalPages <= 1) return null;

  const pageNumbers = getPageNumbers();

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
};

export default React.memo(Pagination);
