//popularMoviesReducer.js
import { createSlice } from "@reduxjs/toolkit";
import { fetchNowPlaying } from "../data/api";

const initialState = {
  nowPlayingMovies: [],
  isNowPlayingLoading: false,
  nowPlayingError: false,
  error: null,
};

const nowPlayingMoviesSlice = createSlice({
  name: "nowPlayingMovies",
  initialState,
  reducers: {
    searchNowPlayingMovies(state, action) {
      const searchTerm = action.payload.toLowerCase();

      state.nowPlayingMovies.forEach((movie) => {
        if (movie.title.toLowerCase().includes(searchTerm)) {
          movie.visible = true;
        } else {
          movie.visible = false;
        }
      });
    },
    fetchNowPlayingMoviesStart(state) {
      state.isNowPlayingLoading = true;
      state.error = null;
    },

    fetchNowPlayingMoviesSuccess(state, action) {
      state.nowPlayingMovies = action.payload;
      state.isNowPlayingLoading = false;
      state.error = null;
    },
    fetchNowPlayingMoviesFailure(state, action) {
      state.isNowPlayingLoading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchNowPlayingMoviesStart,
  fetchNowPlayingMoviesSuccess,
  fetchNowPlayingMoviesFailure,
  searchNowPlayingMovies,
} = nowPlayingMoviesSlice.actions;

export const fetchNowPlayingMovies = () => async (dispatch) => {
  try {
    dispatch(fetchNowPlayingMoviesStart());
    const movies = await fetchNowPlaying(); // Call the TMDB API to fetch all movies
    dispatch(fetchNowPlayingMoviesSuccess(movies));
  } catch (error) {
    dispatch(fetchNowPlayingMoviesFailure(error));
  }
};

export default nowPlayingMoviesSlice.reducer;
