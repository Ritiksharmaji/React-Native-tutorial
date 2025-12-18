import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import { store } from './src/redux/store';
import TodoScreen from './src/screens/TodoScreen';

const App = () => {
  return (
    <Provider store={store}>
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar barStyle="dark-content" />
        <TodoScreen />
      </SafeAreaView>
    </Provider>
  );
};

export default App;
