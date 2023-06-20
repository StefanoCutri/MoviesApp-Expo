import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";

const MovieItem = ({ movie }) => {
  if (movie.visible === undefined || movie.visible === null || movie.visible) {
    return (
      <TouchableOpacity>
        <View style={styles.container}>
        <Image
        source={{ uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}` }}
        style={{ width: 200, height: 200 }}
      />
          {/* <View style={styles.detailsContainer}>
            <Text style={styles.title}>{movie.title}</Text>
            <Text style={styles.overview}>{movie.overview}</Text>
          </View> */}
        </View>
      </TouchableOpacity>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
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
