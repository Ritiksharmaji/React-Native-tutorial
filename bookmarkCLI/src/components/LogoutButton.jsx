import { View, Text, TouchableOpacity, Alert } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

//import { useAuthStore } from "../store/authStore";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../store/authSlice"; // 👈 import thunk

import styles from "../assets/styles/profile.styles";
import COLORS from "../constants/colors";

export default function LogoutButton() {
  //const { logout } = useAuthStore();
  const dispatch = useDispatch();

  const confirmLogout = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Logout",
        style: "destructive",
        // onPress: logout,
        onPress: () => dispatch(logoutUser()), // ✅ dispatch action
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
