import React from "react";
import { Text, StyleSheet } from "react-native";

// Define props type
type GreetingProps = {
  name: string;
};

// const Greeting: React.FC<GreetingProps> = ({ name }) => {
//   return <Text style={styles.text}>Hello, {name}! 👋</Text>;
// };
function Greeting(props: { name: string }) {
    return <Text style={styles.text}>Hello, {props.name}! 👋</Text>;
}

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    fontWeight: "600",
    marginVertical: 5,
    color: "#333",
  },
});

export default Greeting;
