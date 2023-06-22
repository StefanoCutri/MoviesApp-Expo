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
import HeaderImage from "../Header/HeaderImage";
import SearchInput from "../Header/SearchInput";
import LinearGradient from "react-native-linear-gradient";
import { fetchTopRatedMovies } from "../../reducers/topRatedMoviesReducer";

const topRatedMovies = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.topRatedMovies);
console.log("top rated", state.topRatedMovies);
  useEffect(() => {
    dispatch(fetchTopRatedMovies());
  }, [dispatch]);

  // if (state.isLoading) {
  //   return <ActivityIndicator />;
  // } else {
  return (
   
      <View style={styles.container}>
      
        {/* Content */}
        <ScrollView>
          {/* Movies */}
          <Text style={styles.title}>Top Rated</Text>
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
  }
});

export default topRatedMovies;