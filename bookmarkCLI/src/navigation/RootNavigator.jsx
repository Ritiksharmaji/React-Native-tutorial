import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useAuthStore } from "../store/authStore";
import AuthNavigator from "./AuthNavigator";
import TabNavigator from "./TabNavigator";
import React, { useEffect } from "react";

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  //const { user, token } = useAuthStore();
const { user, token, isCheckingAuth, checkAuth } = useAuthStore();
  // Run checkAuth once on mount
  useEffect(() => {
    checkAuth();
  }, []);

  if (isCheckingAuth) {
    // You can return a loading screen while checking AsyncStorage
    return null; // or a <SplashScreen /> component
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
