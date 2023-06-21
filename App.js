// App.js
import React from "react";
import { Provider } from "react-redux";
import store from "./src/store";
import MovieListScreen from "./src/components/Movies/MovieListScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MovieDetailsScreen from "./src/components/Movies/MovieDetailsScreen";
import { ArrowLeftIcon } from "react-native-heroicons/outline";

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
            name="MovieListScreen"
            component={MovieListScreen}
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
