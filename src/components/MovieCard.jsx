import "../css/MovieCard.css";
import { useFavoritesContext } from "../contexts/FavoritesContext";
import { useNavigate } from "react-router-dom";

function MovieCard({ movie, type = "movie", isFromFavorites = false }) {
  // Access favorite context and navigation hook
  const { isFavorite, removeFavorites, addToFavorites } = useFavoritesContext();
  const favorite = isFavorite(movie.id);
  const navigate = useNavigate();

  // Toggle favorite status for the movie
  function handleFavoriteClick(e) {
    e.stopPropagation();
    if (favorite) {
      removeFavorites(movie.id);
    } else {
      addToFavorites(movie, type);
    }
  }

  // Navigate to specific movie/series details page
  function showDetails() {
    if (type === "movie") {
      navigate(`/movieInfo/${movie.id}`);
    } else if (type === "series") {
      navigate(`/seriesInfo/${movie.id}`);
    }
  }

  // Handle navigation with additional context
  const handleClick = () => {
    navigate(`/movieInfo/${movie.id}`, {
      state: { isFromFavorites, category: "movies" },
    });
  };

  return (
    <div className="movie-card" onClick={handleClick}>
      <div className="movie-poster" onClick={showDetails}>
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title || movie.name}
        />
        <div className="movie-overlay">
          <button
            className={`favorite-btn ${favorite ? "active" : ""}`}
            onClick={handleFavoriteClick}
          >
            ☆
          </button>
          <div className="view-details">View Details</div>
        </div>
      </div>

      <div className="movie-info">
        <h3>{movie.title || movie.name}</h3>
        <p>
          {movie.release_date?.split("-")[0] ||
            movie.first_air_date?.split("-")[0]}
        </p>{" "}
      </div>
    </div>
  );
}

export default MovieCard;
