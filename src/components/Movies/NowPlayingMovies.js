import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
} from "react-native";

import MovieItem from "./MovieItem";

import { fetchNowPlayingMovies } from "../../reducers/nowPlayingMoviesReducer";

const NowPlayingMovies = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.nowPlayinMovies);
  useEffect(() => {
    dispatch(fetchNowPlayingMovies());
  }, [dispatch]);

  let noMoviesResult = state.nowPlayingMovies.every((element) => {
    console.log(element.visible);
    return !element.visible;
  });

  return (
    <View style={styles.container}>
      {/* Movies */}
      <Text style={styles.title}>Now Playing</Text>
      {state.isTopRatedLoading ? (
        <ActivityIndicator size={40} color="#fff" />
      ) : (
        <View>
          {noMoviesResult ? (
            <Text style={{ ...styles.title, fontWeight: "normal" }}>
              No results
            </Text>
          ) : (
            <FlatList
              data={state.nowPlayingMovies}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => <MovieItem movie={item} />}
              showsHorizontalScrollIndicator={false}
              horizontal
              style={{
                marginBottom: 10,
                marginTop: 20,
              }}
            />
          )}
        </View>
      )}
    </View>
  );
};
// };

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#000",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    marginLeft: 10,
    marginTop: 30,
  },
});

export default NowPlayingMovies;
