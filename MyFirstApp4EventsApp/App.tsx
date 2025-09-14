/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

// import { NewAppScreen } from '@react-native/new-app-screen';
// import { StatusBar, StyleSheet, useColorScheme, View } from 'react-native';
// import {
//   SafeAreaProvider,
//   useSafeAreaInsets,
// } from 'react-native-safe-area-context';

// function App() {
//   const isDarkMode = useColorScheme() === 'dark';

//   return (
//     <SafeAreaProvider>
//       <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
//       <AppContent />
//     </SafeAreaProvider>
//   );
// }

// function AppContent() {
//   const safeAreaInsets = useSafeAreaInsets();

//   return (
//     <View style={styles.container}>
//       <NewAppScreen
//         templateFileName="App.tsx"
//         safeAreaInsets={safeAreaInsets}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
// });

// export default App;


import React from "react";
import { View, Text, Button } from "react-native";

const App = () => {
  const fruit = (name?: string) => {
    if (name) {
      console.warn(name + " is clicked");
    } else {
      console.warn("No fruit is clicked");
    }
  };

  return (
    <View>
      <Text style={{ fontSize: 20, fontWeight: "bold" }}>
        Button and OnPress Events
      </Text>

      {/* This will call fruit() with no argument */}
      <Button title="Click Me" onPress={() => fruit()} color="green" />

      {/* This will call fruit("Banana") */}
      <Button title="Banana" onPress={() => fruit("Banana")} color="orange" />
    </View>
  );
};

export default App;
