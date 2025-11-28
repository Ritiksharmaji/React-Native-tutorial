import { Button, Text, View } from "react-native";
import React from "react";
export const Login = (props) => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Login Screen</Text>
      {/* <Button
        title='Go to Home'
        onPress={() => props.navigation.navigate("Home")}
      /> */}
      <Button
        title='Go to Home'
        onPress={() =>
          props.navigation.navigate("Home", {
            username: "Ritik Sharma",
            age: 24,
            country: "India"
          })
        }
      />
    </View>
  );
};