import React from "react";
import "../css/MovieInfo.css";
import Navigation from "./Navigation";

const MovieInfo = ({ movie }) => {
  // Round the vote average to one decimal place
  const roundedVoteAverage = Math.round(movie.vote_average * 10) / 10;

  // Format popularity as a human-readable string
  const formattedPopularity = `${Math.floor(
    movie.popularity
  ).toLocaleString()} people watched this movie`;

  // Create a comma-separated list of genre names
  const genreNames = movie.genres.map((genre) => genre.name).join(", ");

  // Show loading state if movie data is not available
  if (!movie) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="movie-info-container">
        <div className="movie-info-header">
          <h1 className="movie-info-title">
            {movie.title}{" "}
            <span className="movie-info-year">
              ({movie.release_date?.split("-")[0]})
            </span>
          </h1>
          <Navigation />
        </div>

        <div className="movie-info-content-wrapper">
          <div
            className="movie-info-backdrop"
            style={{
              backgroundImage: `url(https://image.tmdb.org/t/p/w1280${movie.backdrop_path})`,
            }}
          ></div>

          <div className="movie-info-content">
            <img
              className="movie-info-poster"
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
            />

            <div className="movie-info-details">
              <div className="movie-info-rating">
                <i className="bi bi-star-fill movie-info-icon"></i>
                <span>
                  {roundedVoteAverage} / 10 ({movie.vote_count} votes)
                </span>
              </div>

              <div className="movie-info-release-date">
                <i className="bi bi-calendar movie-info-icon"></i>
                <span>{movie.release_date}</span>
              </div>

              <div className="movie-info-genres">
                <i className="bi bi-film movie-info-icon"></i>
                <span>Genres: {genreNames}</span>
              </div>

              <div className="movie-info-language">
                <i className="bi bi-translate movie-info-icon"></i>
                <span>Language: {movie.original_language.toUpperCase()}</span>
              </div>

              <div className="movie-info-popularity">
                <i className="bi bi-people movie-info-icon"></i>
                <span>{formattedPopularity}</span>
              </div>

              <div className="movie-info-overview">
                <h3>Overview</h3>
                <p>{movie.overview}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MovieInfo;
