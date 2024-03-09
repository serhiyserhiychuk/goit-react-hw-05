import axios from "axios";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3NGJkNTI2ODAzNTJjMDE0ZWZjZWQ5ZGFhYTUwMDllZiIsInN1YiI6IjY1ZTg4YTc4MzQ0YThlMDE3ZDNmOTQwOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.K7uRgoy410QIvHHOPnuEjqzjKZ2zF9nDWXjxlS2k7ls",
  },
};

export const getTrendingMovies = async () => {
  const response = await axios.get(
    "https://api.themoviedb.org/3/trending/movie/day?include_adult=false&language=en-US&page=1",
    options
  );
  return response.data.results;
};

export const getMoviesByQuery = async (query) => {
  const response = await axios.get(
    `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`,
    options
  );
  return response.data.results;
};

export const getMovieDetailsById = async (id) => {
  const response = await axios.get(
    `https://api.themoviedb.org/3/movie/${id}?language=en-US`,
    options
  );
  return response.data;
};

export const getMovieCastById = async (id) => {
  const response = await axios.get(
    `https://api.themoviedb.org/3/movie/${id}/credits?language=en-US`,
    options
  );
  return response.data.cast;
};

export const getMovieReviewsById = async (id) => {
  const response = await axios.get(
    ` https://api.themoviedb.org/3/movie/${id}/reviews?language=en-US&page=1`,
    options
  );
  return response.data.results;
};
