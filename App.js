// App.js
import React from "react";
import { Provider } from "react-redux";
import store from "./src/store";
import MovieListScreen from "./src/components/MovieListScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MovieDetailsScreen from "./src/components/MovieDetailsScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
            <Stack.Screen name="MovieListScreen" component={MovieListScreen} />
            <Stack.Screen
              name="MovieDetailsScreen"
              component={MovieDetailsScreen}
            />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
