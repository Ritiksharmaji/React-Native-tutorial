import { View, Text, TouchableOpacity, Alert } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext"; // ✅ import context

import styles from "../assets/styles/profile.styles";
import COLORS from "../constants/colors";

export default function LogoutButton() {
  const { logoutUser } = useContext(AuthContext); // ✅ get logout function from context

  const confirmLogout = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Logout",
        style: "destructive",
        onPress: logoutUser, // ✅ call context function directly
      },
    ]);
  };

  return (
    <TouchableOpacity style={styles.logoutButton} onPress={confirmLogout}>
      <Ionicons name="log-out-outline" size={20} color={COLORS.white} />
      <Text style={styles.logoutText}>Logout</Text>
    </TouchableOpacity>
  );
}
