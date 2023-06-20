// App.js
import React from "react";
import { Provider } from "react-redux";
import store from "./src/store";
import MovieListScreen from "./src/components/MovieListScreen";
import { SafeAreaView } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MovieDetailsScreen from "./src/components/MovieDetailsScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        {/* <SafeAreaView> */}
          <Stack.Navigator>
            <Stack.Screen name="MovieListScreen" component={MovieListScreen} />
            <Stack.Screen name="MovieDetailsScreen" component={MovieDetailsScreen} />
            {/* <MovieListScreen /> */}
          </Stack.Navigator>
        {/* </SafeAreaView> */}
      </NavigationContainer>
    </Provider>
  );
}
