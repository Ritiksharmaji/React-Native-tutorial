import React from "react";
import { View, Text, StyleSheet } from "react-native";

const StaticGrid = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>📌 Static Grid</Text>
      <View style={styles.row}>
        <View style={styles.box}><Text style={styles.text}>1</Text></View>
        <View style={styles.box}><Text style={styles.text}>2</Text></View>
      </View>
      <View style={styles.row}>
        <View style={styles.box}><Text style={styles.text}>3</Text></View>
        <View style={styles.box}><Text style={styles.text}>4</Text></View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 15 },
  heading: { fontSize: 20, fontWeight: "bold", marginBottom: 10 },
  row: { flexDirection: "row" },
  box: {
    flex: 1,
    height: 100,
    margin: 5,
    backgroundColor: "#90caf9",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
  text: { fontSize: 18, fontWeight: "bold", color: "#fff" },
});

export default StaticGrid;
