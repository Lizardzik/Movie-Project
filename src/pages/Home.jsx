import { useState, useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import MovieCard from "../components/MovieCard";
import { getPopulatorMovies, searchMovies } from "../services/api";
import Pagination from "../components/Pagination";
import SearchForm from "../components/SearchForm";
import FilterOptions from "../components/FilterOptions";
import "../css/Home.css";

function Home({ resetHomePageRef }) {
  // Manage state for movies, search, and pagination
  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [showPagination, setShowPagination] = useState(true);
  const moviesPerPage = 12;
  const [showClearButton, setShowClearButton] = useState(false);

  // Reset and reload movies when search is cleared
  const handleClearSearch = () => {
    setSearchQuery("");
    setShowClearButton(false);
    loadPopularMovies();
  };

  const [searchParams, setSearchParams] = useSearchParams();
  const pageFromURL = searchParams.get("page");

  // Initialize page and load movies on component mount
  useEffect(() => {
    if (pageFromURL) {
      setCurrentPage(Number(pageFromURL));
    }
    loadPopularMovies();
  }, [pageFromURL]);

  // Fetch popular movies with unique entries
  const loadPopularMovies = async () => {
    try {
      setLoading(true);
      const popularMovies = await getPopulatorMovies();

      const uniqueMovies = popularMovies.reduce((acc, current) => {
        if (!acc.find((item) => item.id === current.id)) {
          acc.push(current);
        }
        return acc;
      }, []);

      setMovies(Array.isArray(uniqueMovies) ? uniqueMovies : []);
      setFilteredMovies(Array.isArray(uniqueMovies) ? uniqueMovies : []);
      setError(null);
      setSearchQuery("");
      setShowPagination(true);
    } catch (err) {
      setError("Failed to load movies...");
    } finally {
      setLoading(false);
    }
  };

  // Expose reset function to parent component
  useEffect(() => {
    if (resetHomePageRef) {
      resetHomePageRef.current = loadPopularMovies;
    }
  }, [resetHomePageRef]);

  // Search movies based on query
  const handleSearch = async () => {
    if (!searchQuery.trim()) return;

    setShowClearButton(true);
    setLoading(true);
    try {
      const searchResults = await searchMovies(searchQuery);

      setMovies(searchResults);
      setFilteredMovies(searchResults);
      setError(null);
      setCurrentPage(1);
      setSearchParams({ page: 1 });
      setShowPagination(true);
    } catch (err) {
      setError("Failed to search movies");
    } finally {
      setLoading(false);
    }
  };

  // Trigger search or load movies when query changes
  useEffect(() => {
    if (searchQuery) {
      handleSearch();
    } else {
      loadPopularMovies();
    }
  }, [searchQuery]);

  // Update current page in URL
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    setSearchParams({ page: newPage });
  };

  // Pagination calculations
  const totalPages = Math.ceil(filteredMovies.length / moviesPerPage);
  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentMovies = showPagination
    ? filteredMovies.slice(indexOfFirstMovie, indexOfLastMovie)
    : filteredMovies;

  return (
    <div className="home-filter">
      <div className="filter-section">
        <FilterOptions
          movies={movies}
          setFilteredMovies={setFilteredMovies}
          pageType="movies"
          setShowPagination={setShowPagination}
        />
      </div>

      <div className="main-section">
        <SearchForm
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onSearch={handleSearch}
          searchType="movie"
          showClearButton={showClearButton && searchQuery.length > 0}
          onClear={handleClearSearch}
        />
        {error && <div className="error-message">{error}</div>}
        {loading ? (
          <div className="loading">Loading...</div>
        ) : (
          <>
            <div className="movies-grid">
              {currentMovies.length > 0 ? (
                currentMovies.map((movie) => (
                  <MovieCard movie={movie} key={movie.id} />
                ))
              ) : (
                <div>No movies found</div>
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

export default Home;
