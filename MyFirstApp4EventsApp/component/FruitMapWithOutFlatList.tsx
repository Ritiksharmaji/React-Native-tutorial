import React from "react";
import { ScrollView, View, Text, StyleSheet } from "react-native";

const FruitMapWithOutFlatList = () => {
  const fruits = ["Apple", "Banana", "Mango", "Orange", "Pineapple", "Grapes"];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {fruits.map((fruit, index) => (
        <View key={index} style={styles.card}>
          <Text style={styles.text}>{fruit}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  card: {
    backgroundColor: "#f2f2f2",
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
  },
  text: {
    fontSize: 18,
    fontWeight: "500",
    color: "#333",
  },
});

export default FruitMapWithOutFlatList;
