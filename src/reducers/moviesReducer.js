// moviesReducer.js

import { createSlice } from "@reduxjs/toolkit";
import { fetchAllMovies, fetchSingleMovie } from "../data/api";

const initialState = {
  movies: [],
  popular: [],
  now_playing: [],
  trending: [],
  upcoming: [],
  singleMovie: [],
  isLoading: false,
  error: null,
};

const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    searchMovies(state, action) {
      const searchTerm = action.payload.toLowerCase();
      state.movies.forEach((movie) => {
        if (movie.title.toLowerCase().includes(searchTerm)) {
          movie.visible = true;
        } else {
          movie.visible = false;
        }
      });
    },
    fetchMoviesStart(state) {
      state.isLoading = true;
      state.error = null;
    },
    fetchMoviesSuccess(state, action) {
      state.movies = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    fetchSingleMovieSuccess(state, action){
      state.singleMovie = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    fetchMoviesFailure(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchMoviesStart,
  fetchMoviesSuccess,
  fetchMoviesFailure,
  searchMovies,
  fetchSingleMovieSuccess
} = moviesSlice.actions;

export const fetchMovies = () => async (dispatch) => {
  try {
    dispatch(fetchMoviesStart());
    const movies = await fetchAllMovies(); // Call the TMDB API to fetch all movies
    dispatch(fetchMoviesSuccess(movies));
  } catch (error) {
    dispatch(fetchMoviesFailure(error));
  }
};

export const fetchOneMovie = (movieId) => async (dispatch) => {
  try {
    dispatch(fetchMoviesStart());
    const movie = await fetchSingleMovie(movieId); // Call the TMDB API to fetch all movies
    dispatch(fetchSingleMovieSuccess(movie));
  } catch (error) {
    dispatch(fetchMoviesFailure(error));
  }
};


export default moviesSlice.reducer;
