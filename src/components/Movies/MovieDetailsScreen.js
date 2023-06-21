import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Image, ImageBackground, Text } from "react-native";
import { ArrowLeftIcon } from "react-native-heroicons/outline";
import { useDispatch, useSelector } from "react-redux";
import { fetchSingleMovie } from "../../data/api";
import { fetchOneMovie } from "../../reducers/moviesReducer";

const MovieDetailsScreen = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.movies);

  const movie = route.params;
  const image = {
    uri: `https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`,
  };
  useEffect(() => {
    dispatch(fetchOneMovie(movie.id));
    navigation.setOptions({
      title: movie.title,
      headerLeft: (props) => (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ArrowLeftIcon {...props} />
        </TouchableOpacity>
      ),
    });
  }, [dispatch]);

  const movieGenres = state.singleMovie.genres.slice(0, 3);

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
            marginLeft: 12,
          }}
        >
          {movie.title}
        </Text>
        <View style={{ flexDirection: "row", marginLeft: 8 }}>
          {movieGenres.map((genre) => (
            <View style={{ marginLeft: 5, marginTop: 10, backgroundColor: "#fff", borderRadius: 5 }}>
              <Text key={genre.name} style={{ color: "#000", padding: 2, paddingHorizontal: 5, fontSize: 13}}>
                {genre.name}
              </Text>
            </View>
          ))}
        </View>
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
