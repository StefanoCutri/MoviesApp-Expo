import React from "react";
import MovieListScreen from "./PopularMovies";
import TopRatedMovies from "../Movies/TopRatedMovies";
import {
  Keyboard,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import SearchInput from "../Header/SearchInput";
import { useSelector } from "react-redux";
import HeaderImage from "../Header/HeaderImage";
import { LinearGradient } from "expo-linear-gradient";
import UpComingMovies from "./UpComingMovies";

export const Movies = () => {
  const state = useSelector((state) => state.popularMovies);
  return (
    <SafeAreaView style={styles.container}>
      {/* Search */}
      <SearchInput />
      <ScrollView>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View>
            {state.popularMovies.length > 0 && (
              <HeaderImage movies={state.popularMovies}>
                <LinearGradient
                  colors={["#00000000", "#000000"]}
                  style={{ height: "100%", width: "100%" }}
                ></LinearGradient>
              </HeaderImage>
            )}
            {/* Content */}
            <MovieListScreen />
            <TopRatedMovies />
            <UpComingMovies />
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#000",
    height: "100%",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    marginLeft: 10,
    marginTop: 100,
  },
});
