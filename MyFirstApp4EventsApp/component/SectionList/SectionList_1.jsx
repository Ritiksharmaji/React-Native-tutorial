import React from "react";
import {
  SectionList,
  Text,
  View,
  StyleSheet,
  StatusBar,
} from "react-native";

const DATA = [
  {
    title: "Fruits",
    data: ["Apple", "Banana", "Mango", "Orange", "Papaya"],
  },
  {
    title: "Vegetables",
    data: ["Carrot", "Broccoli", "Spinach", "Potato", "Tomato"],
  },
  {
    title: "Dairy",
    data: ["Milk", "Cheese", "Butter", "Yogurt"],
  },
];

export default function SectionList_1() {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Global Header */}
      <Text style={styles.mainHeader}> 🛒 Grocery List </Text>

      <SectionList
        sections={DATA}
        keyExtractor={(item, index) => item + index}

        // Render each item
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text style={styles.itemText}>• {item}</Text>
          </View>
        )}

        // Render section headers
        renderSectionHeader={({ section }) => (
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
          </View>
        )}

        // Sticky headers
        stickySectionHeadersEnabled={true}

        // Separator between items
        ItemSeparatorComponent={() => <View style={styles.separator} />}

        // Global List Header
        ListHeaderComponent={() => (
          <Text style={styles.listHeader}>Welcome to Grocery Store</Text>
        )}

        // Global List Footer
        ListFooterComponent={() => (
          <Text style={styles.listFooter}>--- End of List ---</Text>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f9f9f9" },
  mainHeader: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 10,
    color: "#333",
  },
  listHeader: {
    fontSize: 18,
    textAlign: "center",
    padding: 10,
    backgroundColor: "#e0ffe0",
    fontWeight: "500",
  },
  listFooter: {
    fontSize: 16,
    textAlign: "center",
    padding: 10,
    backgroundColor: "#eee",
    color: "#555",
  },
  sectionHeader: {
    backgroundColor: "#4CAF50",
    padding: 8,
    borderRadius: 5,
    marginVertical: 5,
    marginHorizontal: 10,
  },
  sectionTitle: { fontSize: 20, fontWeight: "bold", color: "white" },
  itemContainer: {
    padding: 10,
    marginHorizontal: 15,
    backgroundColor: "white",
    borderRadius: 6,
    elevation: 2, // Shadow for Android
    shadowColor: "#000", // Shadow for iOS
    shadowOpacity: 0.1,
    shadowRadius: 3,
    marginVertical: 5,
  },
  itemText: { fontSize: 16, color: "#333" },
  separator: {
    height: 1,
    backgroundColor: "#ddd",
    marginHorizontal: 20,
  },
});
