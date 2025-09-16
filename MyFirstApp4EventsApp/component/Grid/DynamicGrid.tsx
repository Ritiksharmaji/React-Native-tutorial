import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";

const data = [
  { id: "1", name: "Item 1" },
  { id: "2", name: "Item 2" },
  { id: "3", name: "Item 3" },
  { id: "4", name: "Item 4" },
  { id: "5", name: "Item 5" },
  { id: "6", name: "Item 6" },
];

const DynamicGrid = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>⚡ Dynamic Grid</Text>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.row}
        renderItem={({ item }) => (
          <View style={styles.box}>
            <Text style={styles.text}>{item.name}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 15 },
  heading: { fontSize: 20, fontWeight: "bold", marginBottom: 10 },
  row: { justifyContent: "space-between" },
  box: {
    flex: 1,
    height: 100,
    margin: 5,
    backgroundColor: "#a5d6a7",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
  text: { fontSize: 16, fontWeight: "bold", color: "#000" },
});

export default DynamicGrid;
