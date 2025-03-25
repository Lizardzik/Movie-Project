const API_KEY = "f2a883eda2d6556694947872dd17dd75";
const BASE_URL = "https://api.themoviedb.org/3";

// Fetches popular movies from 5 pages (100 movies total)
export const getPopulatorMovies = async () => {
  let allMovies = [];
  let page = 1;

  while (page <= 5) {
    const response = await fetch(
      `${BASE_URL}/movie/popular?api_key=${API_KEY}&page=${page}`
    );
    const data = await response.json();
    allMovies = allMovies.concat(data.results);
    page++;
  }

  return allMovies;
};

// Searches for movies based on query string
export const searchMovies = async (query) => {
  try {
    const response = await fetch(
      `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(
        query
      )}`
    );
    if (!response.ok) throw new Error("Network response was not ok");
    const data = await response.json();
    return data.results || [];
  } catch (error) {
    return [];
  }
};

// Gets detailed information about a specific movie by ID
export const getMovieDetails = async (movieId) => {
  const response = await fetch(
    `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}`
  );
  const data = await response.json();
  return data;
};

// Fetches popular TV series from 5 pages (100 series total)
export const getPopularSeries = async () => {
  let allSeries = [];
  let page = 1;

  while (page <= 5) {
    const response = await fetch(
      `${BASE_URL}/tv/popular?api_key=${API_KEY}&page=${page}`
    );
    const data = await response.json();
    allSeries = allSeries.concat(data.results);
    page++;
  }

  return allSeries;
};

// Searches for TV series based on query string
export const searchSeries = async (query) => {
  try {
    const response = await fetch(
      `${BASE_URL}/search/tv?api_key=${API_KEY}&query=${encodeURIComponent(
        query
      )}`
    );
    if (!response.ok) throw new Error("Network response was not ok");
    const data = await response.json();
    return data.results || [];
  } catch (error) {
    return [];
  }
};

// Gets detailed information about a specific TV series by ID
export const getSeriesDetails = async (seriesId) => {
  const response = await fetch(`${BASE_URL}/tv/${seriesId}?api_key=${API_KEY}`);
  const data = await response.json();
  return data;
};

// Retrieves list of all available movie genres
export const getGenres = async () => {
  const response = await fetch(
    `${BASE_URL}/genre/movie/list?api_key=${API_KEY}`
  );
  const data = await response.json();
  return data.genres;
};

// Retrieves list of all available TV series genres
export const getSeriesGenres = async () => {
  const response = await fetch(`${BASE_URL}/genre/tv/list?api_key=${API_KEY}`);
  const data = await response.json();
  return data.genres;
};
