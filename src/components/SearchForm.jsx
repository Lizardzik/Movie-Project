import React from "react";
import "../css/SearchForm.css";

const SearchForm = ({
  searchQuery,
  setSearchQuery,
  onSearch,
  onClear,
  searchType,
  showClearButton,
}) => {
  // Dynamically set placeholder based on search type
  const placeholder =
    searchType === "movie" ? "Search for a movie..." : "Search for a series...";

  // Prevent default form submission and trigger search
  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  return (
    <form onSubmit={handleSubmit} className="search-form">
      <div className="search-input-wrapper">
        <input
          type="text"
          className="search-input"
          placeholder={placeholder}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        {showClearButton && (
          <span className="clear-icon" onClick={onClear}>
            <i className="bi bi-x"></i>
          </span>
        )}
      </div>
      <button className="search-button" type="submit">
        Search
      </button>
    </form>
  );
};

export default SearchForm;
