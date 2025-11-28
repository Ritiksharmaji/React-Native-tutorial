import { Text, View } from "react-native";
import React from "react";
export const Home = (props) => {
    const { username, age, country } = props.route.params;
  return (
    // <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    //   <Text>Home Screen</Text>
    // </View>
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Home Screen</Text>
        <Text>User: {username}</Text>
        <Text>Age: {age}</Text>
        <Text>Country: {country}</Text>
    </View>
  );
};