import React from "react";
import "../css/Pagination.css";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  // Handle page change with scroll to top and session storage update
  const handlePageChange = (pageNumber) => {
    sessionStorage.setItem("lastPage", pageNumber);
    onPageChange(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="pagination">
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => (
        <button
          key={pageNumber}
          className={pageNumber === currentPage ? "active" : ""}
          onClick={() => handlePageChange(pageNumber)}
        >
          {pageNumber}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
