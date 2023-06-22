import { View, Text, StyleSheet, TextInput } from "react-native";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchMovies } from "../../reducers/popularMoviesReducer";
import {MagnifyingGlassIcon} from 'react-native-heroicons/outline'

const SearchInput = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(searchMovies(searchTerm));
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
        marginLeft: 10
      }}
    >
      <Text style={styles.title}>Movies</Text>
      <View style={{flexDirection: "row", marginLeft: 20, position: "relative"}}>

      <TextInput
        style={styles.searchInput}
        placeholder="Search by title"
        placeholderTextColor="#fff"
        value={searchTerm}
        onChangeText={handleSearch}
        onSubmitEditing={handleSearch}
        
        />
        <MagnifyingGlassIcon color="#fff" style={{position: "absolute", right: 10, top: 3}}/>
        </View>
    </View>
  );
};
const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff"
  },
  searchInput: {
    backgroundColor: "#403d39",
    borderRadius: 8,
    width: 200,
    paddingHorizontal: 5
    
  },
});

export default SearchInput;
