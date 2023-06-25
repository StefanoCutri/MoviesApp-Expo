import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import MovieItem from "./MovieItem";
import { fetchupcomingMovies } from "../../reducers/upcomingMoviesReducer";

const UpComingMovies = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.upcomingMovies);
  useEffect(() => {
    dispatch(fetchupcomingMovies());
  }, [dispatch]);

  let noMoviesResult = state.upcomingMovies.every((element) => {
    return !element.visible;
  });

  return (
    <View style={styles.container}>
      {/* Content */}
        {/* Movies */}
        <Text style={styles.title}>Up Coming</Text>
        {state.isUpcomingLoading ? (
          <ActivityIndicator size={40} color="#fff" />
        ) : (
          <View>
            {noMoviesResult ? (
              <Text style={{ ...styles.title, fontWeight: "normal" }}>
                No results
              </Text>
            ) : (
              <FlatList
                data={state.upcomingMovies}
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
    marginBottom: 100
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    marginLeft: 10,
    marginTop: 30,
  },
});

export default UpComingMovies;
