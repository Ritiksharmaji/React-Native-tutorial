import React from 'react';
import { Provider } from 'react-redux';
import { SafeAreaView } from 'react-native';
import { store } from './src/redux/store';
import TodoScreen from './src/screens/TodoScreen';

const App = () => (
  <Provider store={store}>
    <SafeAreaView style={{ flex: 1 }}>
      <TodoScreen />
    </SafeAreaView>
  </Provider>
);

export default App;
