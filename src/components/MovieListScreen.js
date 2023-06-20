import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  FlatList,
  SafeAreaView,
} from "react-native";
// import {searchMovies} from './src/reducers/moviesReducer'
import MovieItem from "../components/MovieItem";
import { fetchMovies, searchMovies } from "../reducers/moviesReducer";
import { ActivityIndicator } from "react-native";

const MovieListScreen = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.movies);

  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    dispatch(fetchMovies());
  }, [dispatch]);

  const handleSearch = (textValue) => {
    setSearchTerm(textValue);
    dispatch(searchMovies(searchTerm));
  };

  if (state.isLoading) {
    return <ActivityIndicator />;
  } else {
    return (
        <View style={styles.container}>
          <Text style={styles.title}>Movie List</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Search by title"
            value={searchTerm}
            onChangeText={handleSearch}
            onSubmitEditing={handleSearch}
          />
          <FlatList
            data={state.movies}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <MovieItem movie={item} />}
          />
        </View>
    );
  }

  //   if (state.isLoading) {
  //     return (
  //         <ActivityIndicator />
  //     )
  //   } else {
  //     if (state.error !== null) {
  //         return (
  //           <View style={styles.container}>
  //             <Text style={styles.title}>Movie List</Text>
  //             <TextInput
  //               style={styles.searchInput}
  //               placeholder="Search by title"
  //               value={searchTerm}
  //               onChangeText={handleSearch}
  //               onSubmitEditing={handleSearch}
  //             />
  //             <FlatList
  //               data={state.movies}
  //               keyExtractor={(item) => item.id.toString()}
  //               renderItem={({ item }) => <MovieItem movie={item} />}
  //             />
  //           </View>
  //         );
  //     } else {
  //         return <Text>{state.error}</Text>;
  //     }
  //   }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
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
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
  },
});

export default MovieListScreen;
