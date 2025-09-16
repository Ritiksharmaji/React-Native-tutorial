import React from "react";
import { View, Text, ScrollView, FlatList, StyleSheet } from "react-native";

const data = [
  { id: "1", name: "Item 1" },
  { id: "2", name: "Item 2" },
  { id: "3", name: "Item 3" },
  { id: "4", name: "Item 4" },
  { id: "5", name: "Item 5" },
  { id: "6", name: "Item 6" },
  { id: "7", name: "Item 7" },
  { id: "8", name: "Item 8" },
];

export default function FruitListWithAllRender() {
  const renderFlatItem = ({ item }) => (
    <View style={styles.flatItem}>
      <Text style={styles.itemText}>{item.name}</Text>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      {/* 1. List using map() */}
      <Text style={styles.heading}>1️⃣ List using map()</Text>
      {data.map((item) => (
        <View key={item.id} style={styles.listItem}>
          <Text style={styles.itemText}>{item.name}</Text>
        </View>
      ))}

      {/* 2. Grid using map() */}
      <Text style={styles.heading}>2️⃣ Grid using map()</Text>
      <View style={styles.grid}>
        {data.map((item) => (
          <View key={item.id} style={styles.gridItem}>
            <Text style={styles.itemText}>{item.name}</Text>
          </View>
        ))}
      </View>

      {/* 3. FlatList with numColumns */}
      <Text style={styles.heading}>3️⃣ FlatList (2 Columns)</Text>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={renderFlatItem}
        numColumns={2}
        columnWrapperStyle={styles.flatRow}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: "#fff",
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 10,
    color: "#333",
  },
  listItem: {
    padding: 15,
    marginVertical: 5,
    backgroundColor: "#e0f7fa",
    borderRadius: 8,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  gridItem: {
    width: "45%",
    padding: 15,
    margin: 5,
    backgroundColor: "#ffe0b2",
    borderRadius: 8,
    alignItems: "center",
  },
  flatRow: {
    justifyContent: "space-between",
  },
  flatItem: {
    flex: 1,
    margin: 5,
    padding: 15,
    backgroundColor: "#c8e6c9",
    borderRadius: 8,
    alignItems: "center",
  },
  itemText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#000",
  },
});
