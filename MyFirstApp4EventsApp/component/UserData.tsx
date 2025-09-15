import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";

const UserData = () => {
  const [name, setName] = useState("");

  const clearInputData = () => {
    setName("");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Handle Text Input</Text>
      <Text style={styles.subHeading}>Your Name: {name}</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter Your Name"
        value={name}
        onChangeText={(text) => setName(text)}
      />

      {/* Custom Button */}
      <TouchableOpacity style={styles.button} onPress={clearInputData}>
        <Text style={styles.buttonText}>Clear</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  heading: {
    fontSize: 30,
    marginBottom: 10,
  },
  subHeading: {
    fontSize: 25,
    marginBottom: 20,
  },
  input: {
    fontSize: 20,
    color: "black",
    borderWidth: 1,
    borderColor: "gray",
    padding: 10,
    borderRadius: 8,
    marginBottom: 20,
  },
  button: {
    backgroundColor: "green",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default UserData;
