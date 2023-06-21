import moviesReducer, {
  fetchMoviesStart,
  fetchMoviesSuccess,
  fetchMoviesFailure,
  searchMovies,
  fetchSingleMovieSuccess,
  fetchSingleMovieCastSuccess,
  fetchSingleMoviesStart,
  fetchMovies,
  fetchOneMovie,
  fetchCast,
} from "../../reducers/moviesReducer";
import {
  fetchAllMovies,
  fetchSingleMovie,
  fetchSingleMovieCast,
} from "../../data/api";

jest.mock("../../data/api", () => ({
  fetchAllMovies: jest.fn(),
  fetchSingleMovie: jest.fn(),
  fetchSingleMovieCast: jest.fn(),
}));

const initialState = {
  movies: [],
  popular: [],
  now_playing: [],
  trending: [],
  upcoming: [],
  singleMovie: [],
  movieCast: [],
  isLoading: false,
  isLoadinSingleMovie: false,
  error: null,
};

describe("moviesReducer", () => {
  describe("fetchMovies", () => {
    it("should dispatch fetchMoviesStart and fetchMoviesSuccess when fetching movies is successful", async () => {
      const dispatch = jest.fn();
      const movies = [
        { id: 1, title: "Movie 1" },
        { id: 2, title: "Movie 2" },
      ];
      fetchAllMovies.mockResolvedValue(movies);

      await fetchMovies()(dispatch);

      expect(dispatch).toHaveBeenCalledWith(fetchMoviesStart());
      expect(fetchAllMovies).toHaveBeenCalled();
      expect(dispatch).toHaveBeenCalledWith(fetchMoviesSuccess(movies));
    });

    it("should dispatch fetchMoviesStart and fetchMoviesFailure when fetching movies fails", async () => {
      const dispatch = jest.fn();
      const error = "Failed to fetch movies";
      fetchAllMovies.mockRejectedValue(error);

      await fetchMovies()(dispatch);

      expect(dispatch).toHaveBeenCalledWith(fetchMoviesStart());
      expect(fetchAllMovies).toHaveBeenCalled();
      expect(dispatch).toHaveBeenCalledWith(fetchMoviesFailure(error));
    });
  });

  describe("fetchOneMovie", () => {
    it("should dispatch fetchSingleMoviesStart and fetchSingleMovieSuccess when fetching a single movie is successful", async () => {
      const dispatch = jest.fn();
      const movie = { id: 1, title: "Movie 1" };
      const movieId = 1;
      fetchSingleMovie.mockResolvedValue(movie);

      await fetchOneMovie(movieId)(dispatch);

      expect(dispatch).toHaveBeenCalledWith(fetchSingleMoviesStart());
      expect(fetchSingleMovie).toHaveBeenCalledWith(movieId);
      expect(dispatch).toHaveBeenCalledWith(fetchSingleMovieSuccess(movie));
    });

    it("should dispatch fetchSingleMoviesStart and fetchMoviesFailure when fetching a single movie fails", async () => {
      const dispatch = jest.fn();
      const error = "Failed to fetch single movie";
      const movieId = 1;
      fetchSingleMovie.mockRejectedValue(error);

      await fetchOneMovie(movieId)(dispatch);

      expect(dispatch).toHaveBeenCalledWith(fetchSingleMoviesStart());
      expect(fetchSingleMovie).toHaveBeenCalledWith(movieId);
      expect(dispatch).toHaveBeenCalledWith(fetchMoviesFailure(error));
    });
  });

  describe("fetchCast", () => {
    it("should dispatch fetchMoviesStart and fetchSingleMovieCastSuccess when fetching movie cast is successful", async () => {
      const dispatch = jest.fn();
      const cast = [
        { id: 1, name: "Actor 1" },
        { id: 2, name: "Actor 2" },
      ];
      const movieId = 1;
      fetchSingleMovieCast.mockResolvedValue(cast);

      await fetchCast(movieId)(dispatch);

      expect(dispatch).toHaveBeenCalledWith(fetchMoviesStart());
      expect(fetchSingleMovieCast).toHaveBeenCalledWith(movieId);
      expect(dispatch).toHaveBeenCalledWith(fetchSingleMovieCastSuccess(cast));
    });

    it("should dispatch fetchMoviesStart and fetchMoviesFailure when fetching movie cast fails", async () => {
      const dispatch = jest.fn();
      const error = "Failed to fetch movie cast";
      const movieId = 1;
      fetchSingleMovieCast.mockRejectedValue(error);

      await fetchCast(movieId)(dispatch);

      expect(dispatch).toHaveBeenCalledWith(fetchMoviesStart());
      expect(fetchSingleMovieCast).toHaveBeenCalledWith(movieId);
      expect(dispatch).toHaveBeenCalledWith(fetchMoviesFailure(error));
    });
  });

  describe("searchMovies", () => {
    it("should update movie visibility based on the search term", () => {
      const state = {
        movies: [
          { id: 1, title: "Movie 1", visible: true },
          { id: 2, title: "Movie 2", visible: true },
          { id: 3, title: "Movie 3", visible: true },
        ],
      };
      const action = searchMovies("movie 2");

      const newState = moviesReducer(state, action);

      expect(newState.movies[0].visible).toBe(false);
      expect(newState.movies[1].visible).toBe(true);
      expect(newState.movies[2].visible).toBe(false);
    });
  });

  describe("moviesSlice reducer", () => {
    it("should return the initial state", () => {
      const nextState = moviesReducer(undefined, {});
      expect(nextState).toEqual(initialState);
    });

    it("should handle fetchMoviesStart", () => {
      const nextState = moviesReducer(initialState, fetchMoviesStart());
      expect(nextState.isLoading).toBe(true);
      expect(nextState.error).toBe(null);
    });

    it("should handle fetchSingleMoviesStart", () => {
      const nextState = moviesReducer(initialState, fetchSingleMoviesStart());
      expect(nextState.isLoadinSingleMovie).toBe(true);
      expect(nextState.error).toBe(null);
    });

    it("should handle fetchMoviesSuccess", () => {
      const movies = [
        { id: 1, title: "Movie 1" },
        { id: 2, title: "Movie 2" },
      ];
      const nextState = moviesReducer(initialState, fetchMoviesSuccess(movies));
      expect(nextState.movies).toEqual(movies);
      expect(nextState.isLoading).toBe(false);
      expect(nextState.error).toBe(null);
    });

    it("should handle fetchSingleMovieSuccess", () => {
      const movie = { id: 1, title: "Movie 1" };
      const nextState = moviesReducer(
        initialState,
        fetchSingleMovieSuccess(movie)
      );
      expect(nextState.singleMovie).toEqual(movie);
      expect(nextState.isLoadinSingleMovie).toBe(false);
      expect(nextState.error).toBe(null);
    });

    it("should handle fetchSingleMovieCastSuccess", () => {
      const cast = [
        { id: 1, name: "Actor 1" },
        { id: 2, name: "Actor 2" },
      ];
      const nextState = moviesReducer(
        initialState,
        fetchSingleMovieCastSuccess(cast)
      );
      expect(nextState.movieCast).toEqual(cast);
      expect(nextState.isLoadinSingleMovie).toBe(false);
      expect(nextState.error).toBe(null);
    });

    it("should handle fetchMoviesFailure", () => {
      const error = "Failed to fetch movies";
      const nextState = moviesReducer(initialState, fetchMoviesFailure(error));
      expect(nextState.isLoadinSingleMovie).toBe(false);
      expect(nextState.isLoading).toBe(false);
      expect(nextState.error).toBe(error);
    });
  });
});
