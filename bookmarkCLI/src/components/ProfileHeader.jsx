import { View, Text, Image } from "react-native";
import { useContext } from "react";

import styles from "../assets/styles/profile.styles";
import { formatMemberSince } from "../lib/utils";
import { AuthContext } from "../contexts/AuthContext"; // ✅ context

export default function ProfileHeader() {
  const { user } = useContext(AuthContext); // ✅ get user from context

  if (!user) return null;

  return (
    <View style={styles.profileHeader}>
      {/* Profile Image */}
      <Image
        source={{
          uri:
            user.profileImage ||
            "https://cdn-icons-png.flaticon.com/512/149/149071.png",
        }}
        style={styles.profileImage}
        resizeMode="cover"
      />

      {/* User Info */}
      <View style={styles.profileInfo}>
        <Text style={styles.username}>
          {user.username || "User"}
        </Text>

        <Text style={styles.email}>
          {user.email || "No email"}
        </Text>

        <Text style={styles.memberSince}>
          🗓️ Joined {formatMemberSince(user.createdAt)}
        </Text>
      </View>
    </View>
  );
}
