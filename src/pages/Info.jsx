import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieDetails, getSeriesDetails } from "../services/api";
import MovieInfo from "../components/MovieInfo";
import SeriesInfo from "../components/SeriesInfo";

const Info = () => {
  // Fetch and display details for movies or series
  const { movieId, seriesId } = useParams();
  const [data, setData] = useState(null);
  const [isMovie, setIsMovie] = useState(false);

  // Retrieve movie or series details based on ID
  useEffect(() => {
    const fetchDetails = async () => {
      try {
        if (movieId) {
          const movieDetails = await getMovieDetails(movieId);
          setData(movieDetails);
          setIsMovie(true);
        } else if (seriesId) {
          const seriesDetails = await getSeriesDetails(seriesId);
          setData(seriesDetails);
          setIsMovie(false);
        } else {
          console.error("Invalid ID not found!");
        }
      } catch (error) {
        console.error("Error fetching details:", error);
      }
    };

    fetchDetails();
  }, [movieId, seriesId]);

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div className="info-page">
      {isMovie ? <MovieInfo movie={data} /> : <SeriesInfo series={data} />}
    </div>
  );
};

export default Info;
