import { configureStore } from '@reduxjs/toolkit';
import { popularMoviesReducer, singleMovieReducer } from './reducers/index';


const store = configureStore({
  reducer: {
    popularMovies: popularMoviesReducer,
    singleMovie: singleMovieReducer
  },
});

export default store;
