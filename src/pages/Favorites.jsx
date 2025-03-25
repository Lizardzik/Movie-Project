import React, { useState, useEffect } from "react";
import { useFavoritesContext } from "../contexts/FavoritesContext";
import MovieCard from "../components/MovieCard";
import SeriesCard from "../components/SeriesCard";
import EmptyState from "../components/EmptyFavorite";
import "../css/Favorites.css";

function Favorites() {
  // Retrieve and manage favorite items with category persistence
  const { getFavoriteMovies, getFavoriteSeries } = useFavoritesContext();
  const [selectedCategory, setSelectedCategory] = useState(() => {
    return sessionStorage.getItem("favoritesCategory") || "movies";
  });

  const favoriteMovies = getFavoriteMovies();
  const favoriteSeries = getFavoriteSeries();
  const hasFavorites = favoriteMovies.length > 0 || favoriteSeries.length > 0;

  // Persist selected category in session storage
  useEffect(() => {
    sessionStorage.setItem("favoritesCategory", selectedCategory);
  }, [selectedCategory]);

  return (
    <div className="favorites-container">
      {hasFavorites ? (
        <div className="favorites">
          <div className="category-buttons">
            <button
              className={`category-btn ${
                selectedCategory === "movies" ? "active" : ""
              }`}
              onClick={() => setSelectedCategory("movies")}
            >
              Movies
            </button>
            <button
              className={`category-btn ${
                selectedCategory === "series" ? "active" : ""
              }`}
              onClick={() => setSelectedCategory("series")}
            >
              Series
            </button>
          </div>

          {selectedCategory === "movies" ? (
            favoriteMovies.length > 0 ? (
              <>
                <h2>Your Favorite Movies</h2>
                <div className="movies-grid">
                  {favoriteMovies.map((movie) => (
                    <MovieCard
                      movie={movie}
                      key={movie.id}
                      isFromFavorites={true}
                    />
                  ))}
                </div>
              </>
            ) : (
              <EmptyState
                message="No Favorite Movies Yet!"
                linkText="movies"
                linkUrl="/"
              />
            )
          ) : null}

          {selectedCategory === "series" ? (
            favoriteSeries.length > 0 ? (
              <>
                <h2>Your Favorite Series</h2>
                <div className="movies-grid">
                  {favoriteSeries.map((series) => (
                    <SeriesCard
                      series={series}
                      key={series.id}
                      isFromFavorites={true}
                    />
                  ))}
                </div>
              </>
            ) : (
              <EmptyState
                message="No Favorite Series Yet!"
                linkText="series"
                linkUrl="/series"
              />
            )
          ) : null}
        </div>
      ) : (
        <EmptyState
          message="No Favorites Yet!"
          linkText="movies or series"
          linkUrl="/"
        />
      )}
    </div>
  );
}

export default Favorites;
