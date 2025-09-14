import React, { useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";

const Student: React.FC = () => {
  // State counter
  const [marks, setMarks] = useState(0);

  // Normal variable
  let grade = 0;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🎓 Student Component</Text>

      {/* Showing state */}
      <Text style={styles.text}>Marks (state): {marks}</Text>
      <Button
        title="Increase Marks (State)"
        onPress={() => setMarks(marks + 1)}
        color="green"
      />

      {/* Showing variable */}
      <Text style={styles.text}>Grade (variable): {grade}</Text>
      <Button
        title="Increase Grade (Variable)"
        onPress={() => {
          grade = grade + 1;
          console.warn("Grade increased to:", grade);
        }}
        color="red"
      />

      <Text style={styles.note}>
        ✅ Marks will update on screen.{"\n"}
        ❌ Grade won’t update on screen (only logs in console).
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  text: {
    fontSize: 18,
    marginVertical: 10,
  },
  note: {
    marginTop: 20,
    fontSize: 14,
    fontStyle: "italic",
    color: "gray",
    textAlign: "center",
  },
});

export default Student;
