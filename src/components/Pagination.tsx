import React from "react";
import "./Pagination.css";

interface Props {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<Props> = ({
  totalPages,
  currentPage,
  onPageChange,
}) => {
  const pages = Array.from(Array(totalPages).keys()).map((page) => page + 1);

  return (
    <div className="pagination-container">
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`page-button ${page === currentPage ? "active" : ""}`}
        >
          {page}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
