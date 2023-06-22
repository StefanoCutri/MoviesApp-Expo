// moviesReducer.js

import { createSlice } from "@reduxjs/toolkit";
import {
  fetchAllMovies,
  fetchSingleMovie,
  fetchSingleMovieCast,
} from "../data/api";

const initialState = {
  singleMovie: [],
  movieCast: [],
  isLoadinSingleMovie: false,
  error: null,
};

const singleMoviesSlice = createSlice({
  name: "singleMovies",
  initialState,
  reducers: {
    fetchSingleMoviesStart(state) {
      state.isLoadinSingleMovie = true;
      state.error = null;
    },

    fetchSingleMovieSuccess(state, action) {
      state.singleMovie = action.payload;
      state.isLoadinSingleMovie = false;
      state.error = null;
    },
    fetchSingleMovieCastSuccess(state, action) {
      state.movieCast = action.payload;
      state.isLoadinSingleMovie = false;
      state.error = null;
    },
    fetchSingleMoviesFailure(state, action) {
      state.isLoadinSingleMovie = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchSingleMoviesStart,
  fetchSingleMovieSuccess,
  fetchSingleMovieCastSuccess,
  fetchSingleMoviesFailure,
} = singleMoviesSlice.actions;

export const fetchOneMovie = (movieId) => async (dispatch) => {
  try {
    dispatch(fetchSingleMoviesStart());
    const movie = await fetchSingleMovie(movieId); // Call the TMDB API to fetch all movies
    dispatch(fetchSingleMovieSuccess(movie));
  } catch (error) {
    dispatch(fetchSingleMoviesFailure(error));
  }
};

export const fetchCast = (movieId) => async (dispatch) => {
  try {
    dispatch(fetchSingleMoviesStart());
    const cast = await fetchSingleMovieCast(movieId); // Call the TMDB API to fetch all movies
    dispatch(fetchSingleMovieCastSuccess(cast));
  } catch (error) {
    dispatch(fetchSingleMoviesFailure(error));
  }
};

export default singleMoviesSlice.reducer;
