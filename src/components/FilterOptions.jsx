import React, { useState, useEffect } from "react";
import { getGenres, getSeriesGenres } from "../services/api";
import "../css/FilterOptions.css";

const FilterOptions = ({
  movies,
  setFilteredMovies,
  resetFilters,
  pageType,
  setShowPagination,
}) => {
  // Initialize state variables for filtering options
  const [year, setYear] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");
  const [availableGenres, setAvailableGenres] = useState([]);
  const [genreMap, setGenreMap] = useState({});
  const [rating, setRating] = useState(1);

  // Fetch and process genres for the current page type
  useEffect(() => {
    const fetchGenres = async () => {
      try {
        let genres;
        if (pageType === "movies") {
          genres = await getGenres();
        } else if (pageType === "series") {
          genres = await getSeriesGenres();
        }

        // Create a mapping of genre IDs to genre names
        const map = {};
        genres.forEach((genre) => {
          map[genre.id] = genre.name;
        });
        setGenreMap(map);

        // Extract unique genres from the current movies/series
        const uniqueGenres = new Set();
        movies.forEach((item) => {
          if (item.genre_ids) {
            item.genre_ids.forEach((genreId) => {
              if (map[genreId]) {
                uniqueGenres.add(map[genreId]);
              }
            });
          }
        });
        setAvailableGenres([...uniqueGenres]);
      } catch (error) {
        console.error("Failed to fetch genres:", error);
      }
    };

    fetchGenres();
  }, [movies, pageType]);

  // Reset filters when resetFilters prop changes
  useEffect(() => {
    resetFilters && resetFilters();
  }, [resetFilters]);

  // Apply selected filters to the movies/series list
  const handleFilter = () => {
    let filtered = movies;

    // Filter movies/series by release year
    if (year) {
      filtered = filtered.filter((item) => {
        const releaseYear = item.release_date
          ? item.release_date.split("-")[0]
          : item.first_air_date
          ? item.first_air_date.split("-")[0]
          : null;
        return releaseYear === year;
      });
    }

    // Filter movies/series by selected genre
    if (selectedGenre) {
      filtered = filtered.filter((item) =>
        item.genre_ids?.some((genreId) => genreMap[genreId] === selectedGenre)
      );
    }

    // Filter movies/series by minimum rating
    filtered = filtered.filter((item) => item.vote_average >= rating);

    // Update filtered list and hide pagination
    setShowPagination(false);
    setFilteredMovies(filtered);
  };

  // Reset all filter options to their default state
  const handleClearFilter = () => {
    setYear("");
    setSelectedGenre("");
    setRating(1);
    setShowPagination(true);
    setFilteredMovies(movies);
  };

  return (
    <div className="filter-options">
      <h3>Filter Options</h3>

      <div className="filter-group">
        <label>Year:</label>
        <input
          type="number"
          placeholder="Enter year (e.g., 2024)"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          min="1990"
          max={new Date().getFullYear()}
        />
      </div>

      <div className="filter-group">
        <label>Genre:</label>
        <select
          value={selectedGenre}
          onChange={(e) => setSelectedGenre(e.target.value)}
        >
          <option value="">All Genres</option>
          {availableGenres.map((genre, index) => (
            <option key={index} value={genre}>
              {genre}
            </option>
          ))}
        </select>
      </div>

      <div className="filter-group">
        <label>Rating: {rating}</label>
        <input
          type="range"
          min="1"
          max="10"
          step="0.1"
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
        />
      </div>

      <button onClick={handleFilter}>Apply Filter</button>
      <button onClick={handleClearFilter} className="clear-filter-button">
        Clear Filter
      </button>
    </div>
  );
};

export default FilterOptions;
