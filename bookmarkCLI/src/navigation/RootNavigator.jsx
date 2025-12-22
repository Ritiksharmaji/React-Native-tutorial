import React, { useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useDispatch, useSelector } from "react-redux";

import AuthNavigator from "./AuthNavigator";
import TabNavigator from "./TabNavigator";
import { checkAuth } from "../store/authSlice";

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  const dispatch = useDispatch();

  const { user, token, isCheckingAuth } = useSelector(
    (state) => state.auth
  );

  // Run auth check once on app load
  useEffect(() => {
    dispatch(checkAuth());
  }, []);

  // Splash / loading screen while reading AsyncStorage
  if (isCheckingAuth) {
    return null; // or <SplashScreen />
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
