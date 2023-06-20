import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  FlatList,
  SafeAreaView,
} from "react-native";
// import {searchMovies} from './src/reducers/moviesReducer'
import MovieItem from "../components/MovieItem";
import { fetchMovies, searchMovies } from "../reducers/moviesReducer";
import { ActivityIndicator } from "react-native";
import HeaderImage from "./HeaderImage";

const MovieListScreen = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.movies);

  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    dispatch(fetchMovies());
  }, [dispatch]);

  useEffect(() => {
    dispatch(searchMovies(searchTerm));
  }, [searchTerm]);

  const handleSearch = (textValue) => {
    setSearchTerm(textValue);
  };

  if (state.isLoading) {
    return <ActivityIndicator />;
  } else {
    return (
      <View style={styles.container}>
        <View
          style={{
            flexDirection: "row",
            alignContent: "center",
            paddingVertical: 10,
          }}
        >
          <Text style={styles.title}>Movies</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Search by title"
            value={searchTerm}
            onChangeText={handleSearch}
            onSubmitEditing={handleSearch}
          />
        </View>
        {state.movies.length > 0 && <HeaderImage movies={state.movies} />}
        <Text style={styles.title}>Movies</Text>
        <FlatList
          data={state.movies}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <MovieItem movie={item} />}
          horizontal
          style={{
            marginBottom: 50,
          }}
        />
        <FlatList
          data={state.movies}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <MovieItem movie={item} />}
          horizontal
          style={{
            marginBottom: 50,
          }}
        />
        <FlatList
          data={state.movies}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <MovieItem movie={item} />}
          horizontal
          style={{
            marginBottom: 10,
          }}
        />
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#cbcbcb",
  },
  loadingIndicator: {
    justifyContent: "center",
    alignItems: "center",
    color: "#000",
  },
  errorText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "red",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    // marginBottom: 16,
  },
  searchInput: {},
});

export default MovieListScreen;
