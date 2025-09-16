import React from "react";
import {
  FlatList,
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Alert,
} from "react-native";

const StyledFlatList = () => {
  const data = [
    { id: "1", name: "Apple", emoji: "🍎", color: "#ffebee" },
    { id: "2", name: "Banana", emoji: "🍌", color: "#fff9c4" },
    { id: "3", name: "Grapes", emoji: "🍇", color: "#ede7f6" },
    { id: "4", name: "Orange", emoji: "🍊", color: "#ffe0b2" },
    { id: "5", name: "Mango", emoji: "🥭", color: "#fff3e0" },
    { id: "6", name: "Watermelon", emoji: "🍉", color: "#e8f5e9" },
  ];

  const handlePress = (name: string) => {
    Alert.alert("Fruit Selected", `You tapped on ${name}`);
  };

  // items should be objects with keys matching data properties
  const renderItem = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: item.color }]}
      onPress={() => handlePress(item.name)}
    >
      <Text style={styles.emoji}>{item.emoji}</Text>
      <Text style={styles.name}>{item.name}</Text>
    </TouchableOpacity>
  );

    // numColumns={2} → makes a 2-column grid layout.
    // columnWrapperStyle → aligns and spaces items per row.

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.heading}>FlatList with Interaction</Text>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        numColumns={2}
        columnWrapperStyle={styles.row}
      />
   
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fafafa",
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  row: {
    justifyContent: "space-between",
  },
  card: {
    flex: 1,
    margin: 8,
    padding: 20,
    borderRadius: 12,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 4,
  },
  emoji: {
    fontSize: 40,
    marginBottom: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
});

export default StyledFlatList;
