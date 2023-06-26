import React, { useEffect } from "react";
import { View, StyleSheet, TouchableOpacity, FlatList } from "react-native";
import { ImageBackground, Text, ActivityIndicator } from "react-native";
import {
  ArrowLeftIcon,
  CalendarIcon,
  ClockIcon,
  GlobeAltIcon,
} from "react-native-heroicons/outline";
import { useDispatch, useSelector } from "react-redux";

import { LinearGradient } from "expo-linear-gradient";
import StarRating from "react-native-star-rating-widget";
import ISO6391 from "iso-639-1";

import { fetchCast, fetchOneMovie } from "../../reducers/singleMovieReducer";
import CastItem from "./CastItem";

const MovieDetailsScreen = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.singleMovie);
  console.log(state.singleMovie);

  const movie = route.params;

  const image = {
    uri: `https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`,
  };

  useEffect(() => {
    dispatch(fetchOneMovie(movie.id));
    dispatch(fetchCast(movie.id));

    navigation.setOptions({
      title: movie.title,
      headerLeft: (props) => (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ArrowLeftIcon {...props} />
        </TouchableOpacity>
      ),
    });
  }, [dispatch]);

  let movieGenres = [];
  if (state.singleMovie.genres !== undefined) {
    movieGenres = state.singleMovie.genres.slice(0, 3);
  }
  const convertMinsToTime = (mins) => {
    let hours = Math.floor(mins / 60);
    let minutes = mins % 60;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    return `${hours}h ${minutes}min`;
  };

  if (
    state.isLoading &&
    state.movieCast === undefined &&
    state.movieCast.cast === undefined
  ) {
    return <ActivityIndicator />;
  } else {
    return (
      <View style={styles.container}>
        <ImageBackground style={{ width: "100%", height: 220 }} source={image}>
          <LinearGradient
            colors={["#00000000", "#000000"]}
            style={{ height: "100%", width: "100%" }}
          ></LinearGradient>
          {/* Info Container */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              borderWidth: 0,
              borderColor: "red",
              marginTop: 10,
            }}
          >
            {/* Left Column */}
            <View>
              <Text
                style={{
                  color: "white",
                  fontWeight: "bold",
                  fontSize: 22,
                  marginLeft: 12,
                  width: 250,
                }}
              >
                {movie.title}
              </Text>
              <View style={{ flexDirection: "row", marginLeft: 8 }}>
                {movieGenres.map((genre) => (
                  <View
                    key={genre.name}
                    style={{
                      marginLeft: 5,
                      marginTop: 10,
                      backgroundColor: "#fff",
                      borderRadius: 5,
                    }}
                  >
                    <Text
                      style={{
                        color: "#000",
                        padding: 2,
                        paddingHorizontal: 5,
                        fontSize: 13,
                      }}
                    >
                      {genre.name}
                    </Text>
                  </View>
                ))}
              </View>
              <View
                style={{
                  marginLeft: 8,
                  marginTop: 10,
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <StarRating
                  starSize={22}
                  color="#fff"
                  rating={movie.vote_average / 2}
                  onChange={() => console.log("Rating")}
                  animationConfig={{
                    scale: 1,
                  }}
                />
                <View style={{ flexDirection: "row" }}>
                  <Text
                    style={{
                      fontSize: 15,
                      ...styles.textWhite,
                      paddingHorizontal: 5,
                    }}
                  >
                    {state.singleMovie.vote_count}
                  </Text>
                  <Text style={{ fontSize: 15, ...styles.textWhite }}>
                    votes
                  </Text>
                </View>
              </View>
            </View>
            {/* Right Column */}
            <View style={{ marginRight: 32, marginTop: 6 }}>
              {/* Release Date */}
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginBottom: 5,
                }}
              >
                <CalendarIcon
                  color="#fff"
                  size={14}
                  style={{ marginRight: 3 }}
                />
                <Text style={{ ...styles.textWhite, fontSize: 11 }}>
                  {new Date(state.singleMovie.release_date).toLocaleDateString(
                    "pl",
                    { day: "numeric", month: "numeric", year: "2-digit" }
                  )}
                </Text>
              </View>
              {/* Language */}
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginBottom: 5,
                }}
              >
                <GlobeAltIcon
                  color="#fff"
                  size={14}
                  style={{ marginRight: 3 }}
                />
                <Text style={{ ...styles.textWhite, fontSize: 11 }}>
                  {ISO6391.getName(state.singleMovie.original_language)}
                </Text>
              </View>
              {/* Runtime */}
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <ClockIcon color="#fff" size={14} style={{ marginRight: 3 }} />
                <Text style={{ ...styles.textWhite, fontSize: 11 }}>
                  {convertMinsToTime(state.singleMovie.runtime)}
                </Text>
              </View>
            </View>
          </View>
          <Text
            style={{
              ...styles.textWhite,
              paddingHorizontal: 14,
              marginTop: 25,
            }}
          >
            {movie.overview}
          </Text>
          {/* Cast */}
          <View
            style={{
              marginTop: 40,
              marginLeft: 15,
            }}
          >
            <Text
              style={{ ...styles.textWhite, fontWeight: "bold", fontSize: 22 }}
            >
              Cast
            </Text>

            <FlatList
              data={state.movieCast.cast}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => <CastItem item={item} />}
              showsHorizontalScrollIndicator={false}
              horizontal
              style={{
                marginTop: 10,
              }}
            />
          </View>
        </ImageBackground>
      </View>
    );
  }
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
  textWhite: {
    color: "#fff",
  },
});
export default MovieDetailsScreen;
