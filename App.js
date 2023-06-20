// App.js
import React from 'react';
import { Provider } from 'react-redux';
import store from './src/store';
import MovieListScreen from './src/components/MovieListScreen';
import { SafeAreaView } from 'react-native';

export default function App() {
  return (
    <Provider store={store}>
      <SafeAreaView>
      <MovieListScreen/>
      </SafeAreaView>
    </Provider>
  );
}
