import React from "react";
import MovieListScreen from "./PopularMovies";
import TopRatedMovies from "../Movies/TopRatedMovies";
import { SafeAreaView, ScrollView, StyleSheet } from "react-native";
import SearchInput from "../Header/SearchInput";

export const Movies = () => {
  return (
    <SafeAreaView style={styles.container}>
      {/* Search */}
      <SearchInput />
      {/* Content */}
      <ScrollView>
        <MovieListScreen />
        <TopRatedMovies />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    container: {
      backgroundColor: "#000",
    },
    title: {
      fontSize: 20,
      fontWeight: "bold",
      color: "#fff",
      marginLeft: 10,
      marginTop: 100,
    }
  });