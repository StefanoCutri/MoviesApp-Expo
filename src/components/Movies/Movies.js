import React from "react";
import MovieListScreen from "./PopularMovies";
import TopRatedMovies from "../Movies/TopRatedMovies";
import {
  Keyboard,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import SearchInput from "../Header/SearchInput";
import { useDispatch, useSelector } from "react-redux";
import HeaderImage from "../Header/HeaderImage";
import { LinearGradient } from "expo-linear-gradient";
import UpComingMovies from "./UpComingMovies";
import PopularMovies from "./PopularMovies";
import { fetchPopularMovies } from "../../reducers/popularMoviesReducer";
import { fetchTopRatedMovies } from "../../reducers/topRatedMoviesReducer";
import { fetchupcomingMovies } from "../../reducers/upcomingMoviesReducer";
export const Movies = () => {
  const state = useSelector((state) => state.popularMovies);
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1500);
  }, []);

  return (
    <SafeAreaView style={{backgroundColor: "#000", flex: 1}}>
      <SearchInput />
      <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor="#fff"
            colors={["#fff"]}
          />
        }
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={{ width: "100%", height: "100%" }}>
            {state.popularMovies.length > 0 && (
              <HeaderImage movies={state.popularMovies}>
                <LinearGradient
                  colors={["#00000000", "#000000"]}
                  style={{ height: "100%", width: "100%" }}
                ></LinearGradient>
              </HeaderImage>
            )}
              <PopularMovies />
              <TopRatedMovies />
              <UpComingMovies />
            </View>
        </TouchableWithoutFeedback>
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    marginLeft: 10,
    marginTop: 100,
  },
  scrollView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
   flexGrow: 1
  },
});
