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

const MovieListScreen = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.popularMovies);

  console.log(state);

  useEffect(() => {
    dispatch(fetchPopularMovies());
  }, [dispatch]);

  // if (state.isLoading) {
  //   return <ActivityIndicator />;
  // } else {
  return (
    <SafeAreaView>
      <View style={styles.container}>
        {/* Search */}
        <SearchInput />
        {/* Content */}
        <ScrollView>
          {/* Header */}
          {state.popularMovies.length > 0 && (
            <HeaderImage movies={state.popularMovies}>
              <LinearGradient
                colors={["#00000000", "#000000"]}
                style={{ height: "100%", width: "100%" }}
              ></LinearGradient>
            </HeaderImage>
          )}
          {/* Movies */}
          <Text style={styles.title}>Popular</Text>
          <FlatList
            data={state.popularMovies}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <MovieItem movie={item} />}
            showsHorizontalScrollIndicator={false}
            horizontal
            style={{
              marginBottom: 50,
              marginTop: 20,
            }}
          />
          <FlatList
            data={state.popularMovies}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <MovieItem movie={item} />}
            showsHorizontalScrollIndicator={false}
            horizontal
            style={{
              marginBottom: 50,
            }}
          />
          <FlatList
            data={state.popularMovies}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <MovieItem movie={item} />}
            showsHorizontalScrollIndicator={false}
            horizontal
            style={{
              marginBottom: 60,
            }}
          />
        </ScrollView>
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
    marginTop: 100,
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

export default MovieListScreen;
