import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Image, StyleSheet, TouchableOpacity } from "react-native";

const MovieItem = ({ movie }) => {
const navigation = useNavigation()

  if (movie.visible === undefined || movie.visible === null || movie.visible) {
    return (
      <TouchableOpacity style={styles.movieItem} onPress={() => navigation.navigate("MovieDetailsScreen", movie)}>
        <Image
          source={{
            uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
          }}
          style={{ width: 120, height: 160, borderRadius: 20 }}
        />
      </TouchableOpacity>
    );
  }
};

const styles = StyleSheet.create({
  movieItem: {
    paddingHorizontal: 12,
  },
  poster: {
    width: 80,
    height: 120,
    marginRight: 16,
  },
  detailsContainer: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  overview: {
    fontSize: 14,
  },
});

export default MovieItem;
