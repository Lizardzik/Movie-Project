import { useNavigate } from "react-router-dom";
import { useFavoritesContext } from "../contexts/FavoritesContext";
import "../css/MovieCard.css";

function SeriesCard({ series, isFromFavorites = false }) {
  // Access favorite context and navigation hook
  const { isFavorite, removeFavorites, addToFavorites } = useFavoritesContext();
  const favorite = isFavorite(series.id);
  const navigate = useNavigate();

  // Toggle favorite status for the series
  function handleFavoriteClick(e) {
    e.stopPropagation();
    if (favorite) {
      removeFavorites(series.id);
    } else {
      addToFavorites(series, "series");
    }
  }

  // Navigate to series details with context
  const handleClick = () => {
    navigate(`/seriesInfo/${series.id}`, {
      state: { isFromFavorites, category: "series" },
    });
  };

  // Show detailed series information
  function showDetails() {
    navigate(`/seriesInfo/${series.id}`);
  }

  return (
    <div className="movie-card" onClick={handleClick}>
      <div className="movie-poster" onClick={showDetails}>
        <img
          src={`https://image.tmdb.org/t/p/w500${series.poster_path}`}
          alt={series.name}
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
        <h3>{series.name}</h3>
        <p>{series.first_air_date?.split("-")[0]}</p>
      </div>
    </div>
  );
}

export default SeriesCard;
