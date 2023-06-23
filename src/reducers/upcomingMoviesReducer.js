//popularMoviesReducer.js
import { createSlice } from "@reduxjs/toolkit";
import { fetchUpcoming } from "../data/api";

const initialState = {
  upcomingMovies: [],
  isUpcomingLoading: false,
  upcomingMoviesError: false,
  error: null,
};

const upcomingMoviesSlice = createSlice({
  name: "upcomingMovies",
  initialState,
  reducers: {
    searchUpcomingMovies(state, action) {
      const searchTerm = action.payload.toLowerCase();
      state.upcomingMovies.forEach((movie) => {
        if (movie.title.toLowerCase().includes(searchTerm)) {
          movie.visible = true;
        } else {
          movie.visible = false;
        }
      });
    },
    fetchupcomingMoviesStart(state) {
      state.isUpcomingLoading = true;
      state.error = null;
    },

    fetchupcomingMoviesSuccess(state, action) {
      state.upcomingMovies = action.payload;
      state.isUpcomingLoading = false;
      state.error = null;
    },
    fetchupcomingMoviesFailure(state, action) {
      state.isUpcomingLoading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchupcomingMoviesStart,
  fetchupcomingMoviesSuccess,
  fetchupcomingMoviesFailure,
  searchUpcomingMovies,
} = upcomingMoviesSlice.actions;

export const fetchupcomingMovies = () => async (dispatch) => {
  try {
    dispatch(fetchupcomingMoviesStart());
    const movies = await fetchUpcoming(); // Call the TMDB API to fetch all movies
    dispatch(fetchupcomingMoviesSuccess(movies));
  } catch (error) {
    dispatch(fetchupcomingMoviesFailure(error));
  }
};

export default upcomingMoviesSlice.reducer;
