//popularMoviesReducer.js
import { createSlice } from "@reduxjs/toolkit";
import { fetchPopular } from "../data/api";

const initialState = {
  popularMovies: [],
  isPopularLoading: false,
  popularMoviesError: false,
  error: null,
};

const popularMoviesSlice = createSlice({
  name: "popularMovies",
  initialState,
  reducers: {
    searchPopularMovies(state, action) {
      const searchTerm = action.payload.toLowerCase();

      state.popularMovies.forEach((movie) => {
        if (movie.title.toLowerCase().includes(searchTerm)) {
          movie.visible = true;
        } else {
          movie.visible = false;
        }
      });
    },
    fetchPopularMoviesStart(state) {
      state.isPopularLoading = true;
      state.error = null;
    },

    fetchPopularMoviesSuccess(state, action) {
      state.popularMovies = action.payload;
      state.isPopularLoading = false;
      state.error = null;
    },
    fetchPopularMoviesFailure(state, action) {
      state.isPopularLoading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchPopularMoviesStart,
  fetchPopularMoviesSuccess,
  fetchPopularMoviesFailure,
  searchPopularMovies,
} = popularMoviesSlice.actions;

export const fetchPopularMovies = () => async (dispatch) => {
  try {
    dispatch(fetchPopularMoviesStart());
    const movies = await fetchPopular(); // Call the TMDB API to fetch all movies
    dispatch(fetchPopularMoviesSuccess(movies));
  } catch (error) {
    dispatch(fetchPopularMoviesFailure(error));
  }
};

export default popularMoviesSlice.reducer;
