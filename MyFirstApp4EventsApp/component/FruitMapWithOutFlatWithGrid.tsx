import React from "react";
import { ScrollView, View, Text, StyleSheet } from "react-native";

const FruitMapWithOutFlatWithGrid = () => {
  const fruits = [
    "Apple",
    "Banana",
    "Mango",
    "Orange",
    "Pineapple",
    "Grapes",
    "Papaya",
    "Guava",
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.grid}>
        {fruits.map((fruit, index) => (
          <View key={index} style={styles.card}>
            <Text style={styles.text}>{fruit}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap", // wraps to next line
    justifyContent: "space-between", // space between columns
  },
  card: {
    backgroundColor: "#e0f7fa",
    width: "47%", // two items per row
    padding: 20,
    marginBottom: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  text: {
    fontSize: 18,
    fontWeight: "600",
    color: "#00796b",
  },
});

export default FruitMapWithOutFlatWithGrid;
