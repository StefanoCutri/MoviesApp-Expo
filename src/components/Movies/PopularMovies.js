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
import { fetchPopularMovies } from "../../reducers/popularMoviesReducer";
import HeaderImage from "../Header/HeaderImage";
import SearchInput from "../Header/SearchInput";
import LinearGradient from "react-native-linear-gradient";

const PopularMovies = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.popularMovies);

  useEffect(() => {
    dispatch(fetchPopularMovies());
  }, [dispatch]);

  return (
    <SafeAreaView>
      <View style={styles.container}>
          {/* Movies */}
          <Text style={styles.title}>Popular</Text>
          <FlatList
            data={state.popularMovies}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <MovieItem movie={item} />}
            showsHorizontalScrollIndicator={false}
            horizontal
            style={{
              marginBottom: 10,
              marginTop: 20,
            }}
          />
      </View>
    </SafeAreaView>
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
    marginTop: 15,
  },
  loadingIndicator: {
    justifyContent: "center",
    alignItems: "center",
    color: "#000",
  },
  errorText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "red",
  },
});

export default PopularMovies;
