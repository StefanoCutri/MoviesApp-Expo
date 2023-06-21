import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Image, ImageBackground, Text } from "react-native";
import { ArrowLeftIcon } from "react-native-heroicons/outline";

const MovieDetailsScreen = ({ route, navigation }) => {
  const movie = route.params;
  const image = {
    uri: `https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`,
  };
  useEffect(() => {
    console.log(movie.id);
    navigation.setOptions({
      title: movie.title,
      headerLeft: (props) => (
        <TouchableOpacity onPress={() => navigation.goBack()} >
          <ArrowLeftIcon {...props} />
        </TouchableOpacity>
      ),
    });
  }, []);

  console.log(typeof movie.vote_average);
  return (
    <View style={styles.container}>
      <ImageBackground style={{ width: "100%", height: 220 }} source={image}>
        <LinearGradient
          colors={["#00000000", "#000000"]}
          style={{ height: "100%", width: "100%" }}
        ></LinearGradient>
        <Text
          style={{
            color: "white",
            fontWeight: "bold",
            fontSize: 24,
            marginLeft: 20,
          }}
        >
          {movie.title}
        </Text>
      </ImageBackground>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  image: {
    flex: 1,
    justifyContent: "start",
  },
  posterImage: {
    height: 200,
  },
});
export default MovieDetailsScreen;
