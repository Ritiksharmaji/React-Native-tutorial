import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TouchableHighlight,
  TouchableWithoutFeedback,
  Pressable,
  Button,
  StyleSheet,
} from "react-native";

export default function AppButtons() {
  return (
    <View style={styles.container}>

      {/* TouchableOpacity */}
      <TouchableOpacity
        style={styles.opacityBtn}
        onPress={() => console.warn("TouchableOpacity Pressed")}
      >
        <Text style={styles.btnText}>TouchableOpacity</Text>
      </TouchableOpacity>

      {/* TouchableHighlight */}
      <TouchableHighlight
        underlayColor="#FFD700"
        style={styles.highlightBtn}
        onPress={() => console.warn("TouchableHighlight Pressed")}
      >
        <Text style={styles.btnText}>TouchableHighlight</Text>
      </TouchableHighlight>

      {/* Pressable */}
      <Pressable
        onPress={() => console.warn("Pressable Pressed")}
        style={({ pressed }) => [
          styles.pressableBtn,
          { opacity: pressed ? 0.7 : 1 },
        ]}
      >
        <Text style={styles.btnText}>Pressable</Text>
      </Pressable>

      {/* TouchableWithoutFeedback */}
      <TouchableWithoutFeedback
        onPress={() => console.warn("TouchableWithoutFeedback Pressed")}
      >
        <View style={styles.noFeedbackBtn}>
          <Text style={styles.btnText}>TouchableWithoutFeedback</Text>
        </View>
      </TouchableWithoutFeedback>

      {/* Default Button */}
      <Button
        title="Default Button"
        color="red"
        onPress={() => console.warn("Default Button Pressed")}
      />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    justifyContent: "center",
  },
  opacityBtn: {
    backgroundColor: "#1E90FF",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginVertical: 10,
  },
  highlightBtn: {
    backgroundColor: "#32CD32",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginVertical: 10,
  },
  pressableBtn: {
    backgroundColor: "#FF4500",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginVertical: 10,
  },
  noFeedbackBtn: {
    backgroundColor: "#8A2BE2",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginVertical: 10,
  },
  btnText: {
    color: "#fff",
    fontSize: 18,
  },
});
