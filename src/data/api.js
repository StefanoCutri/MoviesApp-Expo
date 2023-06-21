import { useState } from "react";

const API_KEY = "913e10c847c55fbb2045a16908b5870b";

// const fetchPopular = async () => {
//   try {
//     const response = await fetch(
//       `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`
//     );
//     const data = await response.json();
//     console.log("popular", data.results.length);
//     return data.results;
//   } catch (error) {
//     console.error("Error fetching movies:", error);
//     throw error;
//   }
// };
// const fetchTopRated = async () => {
//   try {
//     const response = await fetch(
//       `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}`
//     );
//     const data = await response.json();
//     console.log("toprated", data.results.length);
//     return data.results;
//   } catch (error) {
//     console.error("Error fetching movies:", error);
//     throw error;
//   }
// };
// const fetchNowPlaying = async () => {
//   try {
//     const response = await fetch(
//       `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}`
//     );
//     const data = await response.json();
//     console.log("NOWPLAYING", data.results.length);
//     return data.results;
//   } catch (error) {
//     console.error("Error fetching movies:", error);
//     throw error;
//   }
// };
// const fetchUpcoming = async () => {
//   try {
//     const response = await fetch(
//       `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}`
//     );
//     const data = await response.json();
//     console.log("upcoming", data.results.length);
//     return data.results;
//   } catch (error) {
//     console.error("Error fetching movies:", error);
//     throw error;
//   }
// };

// export const fetchTestMovies = async () => {
//   const [movies, setMovies] = useState({
//     popular: [],
//     top_rated: [],
//     up_coming: [],
//     now_playing: [],
//   });
//   try {
//     const popular = await fetchPopular();
//     const now_playing = await fetchNowPlaying();
//     const up_coming = await fetchUpcoming();    const top_rated = await fetchTopRated();

//     return movies;
//   } catch (error) {
//     console.error("Error fetching movies:", error);
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
    console.error("Error fetching movies:", error);
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
    console.error("Error fetching movies:", error);
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
    console.error("Error fetching movies:", error);
    throw error;
  }
};
