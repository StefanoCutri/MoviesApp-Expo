import { configureStore } from '@reduxjs/toolkit';
import { moviesReducer, singleMovieReducer } from './reducers/index';


const store = configureStore({
  reducer: {
    movies: moviesReducer,
    singleMovie: singleMovieReducer
  },
});

export default store;
