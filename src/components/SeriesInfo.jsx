import React from "react";
import "../css/SeriesInfo.css";
import Navigation from "./Navigation";

const SeriesInfo = ({ series }) => {
  // Show loading state if series data is not available
  if (!series) {
    return <div>Loading...</div>;
  }

  // Round the vote average to one decimal place
  const roundedVoteAverage = Math.round(series.vote_average * 10) / 10;

  // Format popularity as a human-readable string
  const formattedPopularity = `${Math.floor(
    series.popularity
  ).toLocaleString()} people watched this series`;

  // Create a comma-separated list of genre names
  const genreNames = series.genres.map((genre) => genre.name).join(", ");

  // Calculate air date range for the series
  const firstAirYear = series.first_air_date?.split("-")[0];
  const lastAirYear = series.last_air_date?.split("-")[0];
  const airDateRange = lastAirYear
    ? `${firstAirYear} - ${lastAirYear}`
    : firstAirYear;

  return (
    <>
      <div className="series-info-container">
        <div className="series-info-header">
          <h1 className="series-info-title">
            {series.name}{" "}
            <span className="series-info-year">({airDateRange})</span>
          </h1>
          <Navigation />
        </div>

        <div className="series-info-content-wrapper">
          <div
            className="series-info-backdrop"
            style={{
              backgroundImage: `url(https://image.tmdb.org/t/p/w1280${series.backdrop_path})`,
            }}
          ></div>

          <div className="series-info-content">
            <img
              className="series-info-poster"
              src={`https://image.tmdb.org/t/p/w500${series.poster_path}`}
              alt={series.name}
            />

            <div className="series-info-details">
              <div className="series-info-rating">
                <i className="bi bi-star-fill series-info-icon"></i>
                <span>
                  {roundedVoteAverage} / 10 ({series.vote_count} votes)
                </span>
              </div>

              <div className="series-info-release-date">
                <i className="bi bi-calendar series-info-icon"></i>
                <span>First Air Date: {series.first_air_date}</span>
              </div>

              <div className="series-info-release-date">
                <i className="bi bi-calendar series-info-icon"></i>
                <span>Last Air Date: {series.last_air_date}</span>
              </div>

              <div className="series-info-number-of-episodes">
                <i className="bi bi-list-ol series-info-icon"></i>
                <span>Number of Episodes: {series.number_of_episodes}</span>
              </div>

              <div className="series-info-status">
                <i className="bi bi-info-circle series-info-icon"></i>
                <span>Status: {series.status}</span>
              </div>

              <div className="series-info-genres">
                <i className="bi bi-film series-info-icon"></i>
                <span>Genres: {genreNames}</span>
              </div>

              <div className="series-info-language">
                <i className="bi bi-translate series-info-icon"></i>
                <span>Language: {series.original_language.toUpperCase()}</span>
              </div>

              <div className="series-info-popularity">
                <i className="bi bi-people series-info-icon"></i>
                <span>{formattedPopularity}</span>
              </div>

              <div className="series-info-overview">
                <h3>Overview</h3>
                <p>{series.overview}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SeriesInfo;
