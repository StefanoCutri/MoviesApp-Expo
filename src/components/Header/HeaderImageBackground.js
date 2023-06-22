import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { View, Text, Image, ImageBackground, StyleSheet } from "react-native";

export const HeaderImageBackground = ({ movie }) => {
  const image = {
    uri: `https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`,
  };
  return (
    <View style={styles.container}>
      <ImageBackground style={{ width: "100%", height: 200 }} source={image}>
        <LinearGradient
          colors={["#00000000", "#000000"]}
          style={{ height: "100%", width: "100%" }}
        ></LinearGradient>
      </ImageBackground>
    </View>
  );
};

export default HeaderImageBackground;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: "start",
  },
  posterImage: {
    height: 200,
  },
});
