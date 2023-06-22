// App.js
import React, { useEffect } from "react";
import { Provider } from "react-redux";
import store from "./src/store";
import MovieListScreen from "./src/components/Movies/PopularMovies";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MovieDetailsScreen from "./src/components/Movies/MovieDetailsScreen";
import { ArrowLeftIcon } from "react-native-heroicons/outline";
import { fetchMovies } from "./src/data/api";
import { Movies } from "./src/components/Movies/Movies";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: "#000",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
            // headerBackTitleVisible: false,
            headerBackTitle: "Hola"
          }}
        >
          <Stack.Screen
            name="Movies"
            component={Movies}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="MovieDetailsScreen"
            component={MovieDetailsScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
