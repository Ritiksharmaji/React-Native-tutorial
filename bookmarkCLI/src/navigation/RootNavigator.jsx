import React, { useEffect, useContext } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import AuthNavigator from "./AuthNavigator";
import TabNavigator from "./TabNavigator";
import { AuthContext } from "../contexts/AuthContext"; // import your context

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  const { user, token, isCheckingAuth, checkAuth } = useContext(AuthContext);

  // Run auth check once on app load
  useEffect(() => {
    checkAuth();
  }, []);

  // Splash / loading screen while reading AsyncStorage
  if (isCheckingAuth) {
    return null; // or <SplashScreen /> if you have one
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {user && token ? (
        <Stack.Screen name="Tabs" component={TabNavigator} />
      ) : (
        <Stack.Screen name="Auth" component={AuthNavigator} />
      )}
    </Stack.Navigator>
  );
}
