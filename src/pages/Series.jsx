import SeriesCard from "../components/SeriesCard";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { searchSeries, getPopularSeries } from "../services/api";
import Pagination from "../components/Pagination";
import SearchForm from "../components/SearchForm";
import FilterOptions from "../components/FilterOptions";
import "../css/Home.css";

function Series() {
  // Manage state for series, search, and pagination
  const [searchQuery, setSearchQuery] = useState("");
  const [series, setSeries] = useState([]);
  const [filteredSeries, setFilteredSeries] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [showPagination, setShowPagination] = useState(true);
  const [showClearButton, setShowClearButton] = useState(false);
  const seriesPerPage = 12;

  const [searchParams, setSearchParams] = useSearchParams();
  const pageFromURL = searchParams.get("page");

  // Initialize page and load popular series
  useEffect(() => {
    if (pageFromURL) {
      setCurrentPage(Number(pageFromURL));
    }
    loadPopularSeries();
  }, [pageFromURL]);

  // Fetch popular series with unique entries
  const loadPopularSeries = async () => {
    try {
      setLoading(true);
      const popularSeries = await getPopularSeries();

      const uniqueSeries = popularSeries.reduce((acc, current) => {
        if (!acc.find((item) => item.id === current.id)) {
          acc.push(current);
        }
        return acc;
      }, []);

      setSeries(Array.isArray(uniqueSeries) ? uniqueSeries : []);
      setFilteredSeries(Array.isArray(uniqueSeries) ? uniqueSeries : []);
      setError(null);
      setSearchQuery("");
      setShowClearButton(false);
      setShowPagination(true);
    } catch (err) {
      setError("Failed to load series...");
    } finally {
      setLoading(false);
    }
  };

  // Search series based on query
  const handleSearch = async () => {
    if (!searchQuery.trim()) return;

    setShowClearButton(true);
    setLoading(true);
    try {
      const searchResults = await searchSeries(searchQuery);

      setSeries([...searchResults]);
      setFilteredSeries([...searchResults]);
      setError(null);
      setCurrentPage(1);
      setSearchParams({ page: 1 });
      setShowPagination(true);
    } catch (err) {
      setError("Failed to search series");
    } finally {
      setLoading(false);
    }
  };

  // Trigger search when query changes
  useEffect(() => {
    if (searchQuery) {
      handleSearch();
    }
  }, [searchQuery]);

  // Reset search and reload series
  const handleClearSearch = () => {
    setSearchQuery("");
    setShowClearButton(false);
    loadPopularSeries();
  };

  // Update current page in URL
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    setSearchParams({ page: newPage });
  };

  // Pagination calculations
  const totalPages = Math.ceil(filteredSeries.length / seriesPerPage);
  const indexOfLastSeries = currentPage * seriesPerPage;
  const indexOfFirstSeries = indexOfLastSeries - seriesPerPage;
  const currentSeries = showPagination
    ? filteredSeries.slice(indexOfFirstSeries, indexOfLastSeries)
    : filteredSeries;

  return (
    <div className="home-filter">
      <div className="filter-section">
        <FilterOptions
          movies={series}
          setFilteredMovies={setFilteredSeries}
          pageType="series"
          setShowPagination={setShowPagination}
        />
      </div>

      <div className="main-section">
        <SearchForm
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onSearch={handleSearch}
          onClear={handleClearSearch}
          searchType="series"
          showClearButton={showClearButton && searchQuery.length > 0}
        />

        {error && <div className="error-message">{error}</div>}

        {loading ? (
          <div className="loading">Loading...</div>
        ) : (
          <>
            <div className="movies-grid">
              {currentSeries.length > 0 ? (
                currentSeries.map((show) => (
                  <SeriesCard series={show} key={show.id} />
                ))
              ) : (
                <div>No series found</div>
              )}
            </div>

            {showPagination && totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default Series;
