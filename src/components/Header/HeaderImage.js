import React, { useMemo } from "react";
import { View, StyleSheet, Image } from "react-native";
import { useSelector } from "react-redux";
import HeaderImageBackground from "./HeaderImageBackground";

const HeaderImage = () => {
  const state = useSelector((state) => state.movies);
  const getRandomNum = (maxLim) => {
    let rand = Math.random() * maxLim;
    rand = Math.floor(rand);
    return rand;
  };

  const memoizedMovie = useMemo(
    () => state.movies[getRandomNum(state.movies.length)],
    []
  );

  return (
    <View style={styles.headerContainer}>
      <HeaderImageBackground movie={memoizedMovie}></HeaderImageBackground>
    </View>
  );
};

export default HeaderImage;

const styles = StyleSheet.create({
  headerContainer: {
    height: 200,
    position: "relative",
  },
  background: {
    height: "100%",
  },
});
