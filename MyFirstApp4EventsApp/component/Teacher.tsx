import React, { useState } from "react";
import { View, Text, StyleSheet, Button } from "react-native";

export default function Teacher() {
  const [isDark, setIsDark] = useState(false);

  return (
    <View style={[styles.container, isDark && styles.dark]}>
      <Text style={[styles.text, isDark ? styles.lightText : styles.darkText]}>
        React Native Styling 🚀
      </Text>
      <Button
        title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
        onPress={() => setIsDark(!isDark)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  dark: {
    backgroundColor: "#222",
  },
  text: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
  },
  darkText: {
    color: "#000",
  },
  lightText: {
    color: "#fff",
  },
});
