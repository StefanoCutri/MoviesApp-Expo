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
import LinearGradient from "react-native-linear-gradient";

const MovieListScreen = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.movies);

  useEffect(() => {
    dispatch(fetchMovies());
  }, [dispatch]);

  if (state.isLoading) {
    return <ActivityIndicator />;
  } else {
    return (
      <SafeAreaView>
        <View style={styles.container}>
          {/* Search */}
          <SearchInput />
          {/* Content */}
          <ScrollView>
            {/* Header */}
            {state.movies.length > 0 && (
              <HeaderImage movies={state.movies}>
                <LinearGradient
                  colors={["#00000000", "#000000"]}
                  style={{ height: "100%", width: "100%" }}
                ></LinearGradient>
              </HeaderImage>
            )}
            {/* Movies */}
            <Text style={styles.title}>Popular Movies</Text>
            <FlatList
              data={state.movies}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => <MovieItem movie={item} />}
              showsHorizontalScrollIndicator={false}
              horizontal
              style={{
                marginBottom: 50,
                marginTop: 20,
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
                marginBottom: 60,
              }}
            />
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#000",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    paddingTop: 20,
    marginLeft: 10,
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
