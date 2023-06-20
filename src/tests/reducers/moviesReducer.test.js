import { useDispatch } from 'react-redux';
import moviesReducer, {
  fetchMoviesStart,
  fetchMoviesSuccess,
  fetchMoviesFailure,
  searchMovies,
  fetchMovies,
} from '../../reducers/moviesReducer';
import {fetchAllMovies} from '../../data/api'

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
}));

jest.mock('../../data/api', () => ({
  fetchAllMovies: jest.fn(),
}));

describe('moviesReducer', () => {
  describe('fetchMovies', () => {
    it('should dispatch fetchMoviesStart and fetchMoviesSuccess when fetching movies is successful', async () => {
      const dispatch = jest.fn();
      const movies = [{ id: 1, title: 'Movie 1' }, { id: 2, title: 'Movie 2' }];
      const mockFetchAllMovies = jest.fn().mockResolvedValue(movies);
      fetchAllMovies.mockImplementation(mockFetchAllMovies);
      useDispatch.mockReturnValue(dispatch);

      await fetchMovies()(dispatch);

      expect(dispatch).toHaveBeenCalledWith(fetchMoviesStart());
      expect(mockFetchAllMovies).toHaveBeenCalled();
      expect(dispatch).toHaveBeenCalledWith(fetchMoviesSuccess(movies));
    });

    it('should dispatch fetchMoviesStart and fetchMoviesFailure when fetching movies fails', async () => {
      const dispatch = jest.fn();
      const error = 'Failed to fetch movies';
      const mockFetchAllMovies = jest.fn().mockRejectedValue(error);
      fetchAllMovies.mockImplementation(mockFetchAllMovies);
      useDispatch.mockReturnValue(dispatch);

      await fetchMovies()(dispatch);

      expect(dispatch).toHaveBeenCalledWith(fetchMoviesStart());
      expect(mockFetchAllMovies).toHaveBeenCalled();
      expect(dispatch).toHaveBeenCalledWith(fetchMoviesFailure(error));
    });
  });

  describe('searchMovies', () => {
    it('should update the visibility of movies based on the search term', () => {
      const state = {
        movies: [
          { id: 1, title: 'Movie 1', visible: true },
          { id: 2, title: 'Movie 2', visible: true },
          { id: 3, title: 'Movie 3', visible: true },
        ],
        isLoading: false,
        error: null,
      };
      const action = { payload: 'movie 1' };

      const newState = moviesReducer(state, searchMovies(action.payload));

      expect(newState.movies[0].visible).toBe(true);
      expect(newState.movies[1].visible).toBe(false);
      expect(newState.movies[2].visible).toBe(false);
    });
  });
});
