import { configureStore } from '@reduxjs/toolkit';
import { nowPlayingMoviesReducer, popularMoviesReducer, singleMovieReducer, topRatedMoviesReducer, upcomingMoviesReducer } from './reducers/index';


const store = configureStore({
  reducer: {
    popularMovies: popularMoviesReducer,
    singleMovie: singleMovieReducer,
    topRatedMovies: topRatedMoviesReducer,
    upcomingMovies: upcomingMoviesReducer,
    nowPlayinMovies: nowPlayingMoviesReducer
  },
});

export default store;
