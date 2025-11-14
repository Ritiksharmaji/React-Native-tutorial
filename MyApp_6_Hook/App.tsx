// /**
//  * Sample React Native App
//  * https://github.com/facebook/react-native
//  *
//  * @format
//  */

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

import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

function AppContent() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState("Ritik");

  /* -----------------------------------------
     1️⃣ componentDidMount (runs only once) as class component
  ------------------------------------------ */
  useEffect(() => {
    console.log("🔵 componentDidMount → Screen Loaded");

    // Example: API call
    // fetchUserData();

  }, []); // empty dependency → runs only once



  /* ---------------------------------------------------------
     2️⃣ componentDidUpdate (runs whenever 'count state' changes) as class component
  ------------------------------------------------------------ */
  useEffect(() => {
    console.log("🟡 componentDidUpdate → count changed:", count);
  }, [count]);



  /* -----------------------------------------------------------------------
     3️⃣ componentDidUpdate for specific state (runs when name state changes) as class component
  ------------------------------------------------------------------------- */
  useEffect(() => {
    console.log("🟢 Name updated:", name);
  }, [name]);

  /* ----------------------------------------------------
     4️⃣ componentWillUnmount (cleanup before unmount) as class component
     Note: This runs when the component is about to be removed
  ------------------------------------------------------ */
  useEffect(() => {
    console.log("🔴 componentWillUnmount setup");

    return () => {
      console.log("❌ componentWillUnmount → component removed");
    };
  }, []); 



  return (
    <View style={styles.container}>
      <Text style={styles.title}>useEffect Lifecycle Demo</Text>

      <Text style={styles.text}>Count: {count}</Text>
      <Button title="Increase Count" onPress={() => setCount(count + 1)} />

      <View style={{ marginTop: 20 }}>
        <Text style={styles.text}>Name: {name}</Text>
        <Button title="Change Name" onPress={() => setName("Sharma")} />
      </View>

    </View>
  );
}

export default AppContent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  text: {
    fontSize: 18,
    marginVertical: 10,
  },
});
