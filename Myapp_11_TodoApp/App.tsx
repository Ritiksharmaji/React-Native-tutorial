import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import TodoScreen from './src/screens/TodoScreen';

const App = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar barStyle="dark-content" />
      <TodoScreen />
    </SafeAreaView>
  );
};

export default App;
