import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {
  fetchPopularMovies,
  fetchPopularMoviesStart,
  fetchPopularMoviesSuccess,
  fetchPopularMoviesFailure,
  searchPopularMovies,
} from '../../reducers/popularMoviesReducer';
import { fetchPopular } from '../../data/api';
import { popularMoviesReducer } from "../../reducers/index";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

jest.mock("../../data/api", () => ({
  fetchPopular: jest.fn(),
}));

describe('popularMoviesReducer', () => {
  describe('fetchPopularMovies', () => {
    afterEach(() => {
      jest.clearAllMocks();
    });

    it('dispatches the expected actions on successful API call', async () => {
      const movies = ['Movie 1', 'Movie 2'];
      fetchPopular.mockResolvedValue(movies);

      const expectedActions = [
        fetchPopularMoviesStart(),
        fetchPopularMoviesSuccess(movies),
      ];

      const store = mockStore({});
      await store.dispatch(fetchPopularMovies());

      expect(store.getActions()).toEqual(expectedActions);
      expect(fetchPopular).toHaveBeenCalled();
    });

    it('dispatches the expected actions on failed API call', async () => {
      const error = 'Error fetching popular movies';
      fetchPopular.mockRejectedValue(error);

      const expectedActions = [
        fetchPopularMoviesStart(),
        fetchPopularMoviesFailure(error),
      ];

      const store = mockStore({});
      await store.dispatch(fetchPopularMovies());

      expect(store.getActions()).toEqual(expectedActions);
      expect(fetchPopular).toHaveBeenCalled();
    });
  });

  describe('searchPopularMovies', () => {
    it('updates movie visibility correctly when search term is empty', () => {
      const initialState = {
        popularMovies: [
          { title: 'Movie 1', visible: false },
          { title: 'Movie 2', visible: false },
          { title: 'Movie 3', visible: false },
        ],
      };

      const expectedState = {
        popularMovies: [
          { title: 'Movie 1', visible: true },
          { title: 'Movie 2', visible: true },
          { title: 'Movie 3', visible: true },
        ],
      };

      const action = {
        type: searchPopularMovies.type,
        payload: '',
      };

      const newState = popularMoviesReducer(initialState, action);

      expect(newState).toEqual(expectedState);
    });

    it('updates movie visibility correctly when search term is not empty', () => {
      const initialState = {
        popularMovies: [
          { title: 'Movie 1', visible: false },
          { title: 'Movie 2', visible: false },
          { title: 'Movie 3', visible: false },
        ],
      };

      const expectedState = {
        popularMovies: [
          { title: 'Movie 1', visible: true },
          { title: 'Movie 2', visible: true },
          { title: 'Movie 3', visible: true },
        ],
      };

      const action = {
        type: searchPopularMovies.type,
        payload: 'movie',
      };

      const newState = popularMoviesReducer(initialState, action);

      expect(newState).toEqual(expectedState);
    });
  });
});