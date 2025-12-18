import React from 'react';
import { SafeAreaView } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './src/redux/store';
import TodoScreen from './src/screens/TodoScreen';

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SafeAreaView style={{ flex: 1 }}>
          <TodoScreen />
        </SafeAreaView>
      </PersistGate>
    </Provider>
  );
};

export default App;
