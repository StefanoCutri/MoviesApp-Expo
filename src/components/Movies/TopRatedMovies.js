import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  SafeAreaView,
  ScrollView,
} from "react-native";
import MovieItem from "./MovieItem";
import { fetchTopRatedMovies } from "../../reducers/topRatedMoviesReducer";

const topRatedMovies = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.topRatedMovies);
  useEffect(() => {
    dispatch(fetchTopRatedMovies());
  }, [dispatch]);

  let noMoviesResult = state.topRatedMovies.every((element) => {
    return !element.visible;
  });

  return (
    <View style={styles.container}>
      {/* Content */}
      <ScrollView>
        {/* Movies */}
        <Text style={styles.title}>Top Rated</Text>
        {noMoviesResult ? (
          <Text style={{...styles.title, fontWeight:"normal"}}>No results</Text>
        ) : (
          <FlatList
            data={state.topRatedMovies}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <MovieItem movie={item} />}
            showsHorizontalScrollIndicator={false}
            horizontal
            style={{
              paddingBottom: 120,
              marginTop: 20,
            }}
          />
        )}
      </ScrollView>
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

export default topRatedMovies;
