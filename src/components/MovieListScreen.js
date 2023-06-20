import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  FlatList,
  SafeAreaView,
  ScrollView,
} from "react-native";
// import {searchMovies} from './src/reducers/moviesReducer'
import MovieItem from "../components/MovieItem";
import { fetchMovies, searchMovies } from "../reducers/moviesReducer";
import { ActivityIndicator } from "react-native";
import HeaderImage from "./HeaderImage";
import SearchInput from "./SearchInput";

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
      <ScrollView>
        <View style={styles.container}>
          <SearchInput />
          {state.movies.length > 0 && <HeaderImage movies={state.movies} />}
          <Text style={styles.title}>Movies</Text>
          <FlatList
            data={state.movies}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <MovieItem movie={item} />}
            showsHorizontalScrollIndicator={false}
            horizontal
            style={{
              marginBottom: 50,
            }}
          />
          <FlatList
            data={state.movies}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <MovieItem movie={item} />}
            showsHorizontalScrollIndicator={false}
            horizontal
            style={{
              marginBottom: 50,
            }}
          />
          <FlatList
            data={state.movies}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <MovieItem movie={item} />}
            showsHorizontalScrollIndicator={false}
            horizontal
            style={{
              marginBottom: 10,
            }}
          />
        </View>
      </ScrollView>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#000",
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

});

export default MovieListScreen;
