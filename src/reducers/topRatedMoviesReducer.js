// moviesReducer.js

import { createSlice } from "@reduxjs/toolkit";
import { fetchTopRated } from "../data/api";

const initialState = {
  topRatedMovies: [],
  isTopRatedLoading: false,
  error: null,
};

const topRatedMoviesSlice = createSlice({
  name: "topRatedMovies",
  initialState,
  reducers: {
    searchTopRatedMovies(state, action) {
      const searchTerm = action.payload.toLowerCase();
      state.topRatedMovies.forEach((movie) => {
        if (movie.title.toLowerCase().includes(searchTerm)) {
          movie.visible = true;
        } else {
          movie.visible = false;
        }
      });
    },
    fetchTopRatedMoviesStart(state) {
      state.isTopRatedLoading = true;
      state.error = null;
    },

    fetchTopRatedMoviesSuccess(state, action) {
      state.topRatedMovies = action.payload;
      state.isTopRatedLoading = false;
      state.error = null;
    },
    fetchTopRatedMoviesFailure(state, action) {
      state.isTopRatedLoading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchTopRatedMoviesStart,
  fetchTopRatedMoviesSuccess,
  fetchTopRatedMoviesFailure,
  searchTopRatedMovies,
} = topRatedMoviesSlice.actions;

export const fetchTopRatedMovies = () => async (dispatch) => {
  try {
    dispatch(fetchTopRatedMoviesStart());
    const movies = await fetchTopRated(); // Call the TMDB API to fetch all movies
    dispatch(fetchTopRatedMoviesSuccess(movies));
  } catch (error) {
    dispatch(fetchTopRatedMoviesFailure(error));
  }
};

export default topRatedMoviesSlice.reducer;
