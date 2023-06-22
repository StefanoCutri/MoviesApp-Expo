import { View, Text, StyleSheet, TextInput } from "react-native";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { searchPopularMovies } from "../../reducers/popularMoviesReducer";
import { MagnifyingGlassIcon } from "react-native-heroicons/outline";
import { searchTopRatedMovies } from "../../reducers/topRatedMoviesReducer";

const SearchInput = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    setTimeout(() => {
      dispatch(searchPopularMovies(searchTerm));
      dispatch(searchTopRatedMovies(searchTerm));
    }, 1500);
  }, [searchTerm]);

  const handleSearch = (textValue) => {
    setSearchTerm(textValue);
  };
  return (
    <View
      style={{
        flexDirection: "row",
        alignContent: "center",
        paddingVertical: 20,
        marginLeft: 10,
      }}
    >
      <Text style={styles.title}>Movies</Text>
      <View
        style={{ flexDirection: "row", marginLeft: 20, position: "relative" }}
      >
        <TextInput
          style={styles.searchInput}
          placeholder="Search by title"
          placeholderTextColor="#fff"
          value={searchTerm}
          onChangeText={handleSearch}
        />
        <MagnifyingGlassIcon
          color="#fff"
          style={{ position: "absolute", right: 10, top: 3 }}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  searchInput: {
    backgroundColor: "#403d39",
    borderRadius: 8,
    width: 200,
    paddingHorizontal: 5,
    color: "#fff",
  },
});

export default SearchInput;
