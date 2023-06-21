import { useState } from "react";

const API_KEY = '913e10c847c55fbb2045a16908b5870b';

// export const fetchMovies = async () => {
//   const [movies, setMovies] = useState({
//     popular: [],
//     trending: [],
//     upcoming: [],
//     nowPlaying: []
// })
//   try {
//     const popularResponse = await fetch(
//       `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`
//     );
//     const popularData = await response.json();
//     set
//     return data.results;
//   } catch (error) {
//     console.error('Error fetching movies:', error);
//     throw error;
//   }
// };
export const fetchAllMovies = async () => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`
    );
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error('Error fetching movies:', error);
    throw error;
  }
};

export const fetchSingleMovie = async (movideId) => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${movideId}?api_key=${API_KEY}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching movies:', error);
    throw error;
  }
};

export const fetchSingleMovieCast = async (movideId) => {
  try {
    const response = await fetch(
      `http://api.themoviedb.org/3/movie/${movideId}/casts?api_key=${API_KEY}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching movies:', error);
    throw error;
  }
};