// moviesReducer.js

import { createSlice } from "@reduxjs/toolkit";
import { fetchAllMovies } from "../data/api";

const initialState = {
  movies: [],
  isLoading: false,
  error: null,
};

const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    searchMovies(state, action) {
      const searchTerm = action.payload.toLowerCase();
      console.log(searchTerm);
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
} = moviesSlice.actions;

export const fetchMovies = () => async (dispatch) => {
  try {
    dispatch(fetchMoviesStart());
    const movies = await fetchAllMovies(); // Call the TMDB API to fetch all movies
      dispatch(fetchMoviesSuccess(movies));
  } catch (error) {
    dispatch(fetchMoviesFailure('Failed to fetch movies'));
  }
};

export default moviesSlice.reducer;
