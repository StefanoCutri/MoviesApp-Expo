import { configureStore } from '@reduxjs/toolkit';
import { popularMoviesReducer, singleMovieReducer, topRatedMoviesReducer, upcomingMoviesReducer } from './reducers/index';


const store = configureStore({
  reducer: {
    popularMovies: popularMoviesReducer,
    singleMovie: singleMovieReducer,
    topRatedMovies: topRatedMoviesReducer,
    upcomingMovies: upcomingMoviesReducer
  },
});

export default store;
