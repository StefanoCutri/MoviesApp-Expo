import { configureStore } from '@reduxjs/toolkit';
import { popularMoviesReducer, singleMovieReducer, topRatedMoviesReducer } from './reducers/index';


const store = configureStore({
  reducer: {
    popularMovies: popularMoviesReducer,
    singleMovie: singleMovieReducer,
    topRatedMovies: topRatedMoviesReducer
  },
});

export default store;
