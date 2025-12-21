import { useState } from "react";
import {
  View,
  Text,
  Platform,
  KeyboardAvoidingView,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { launchImageLibrary } from "react-native-image-picker";

import styles from "../assets/styles/create.styles";
import COLORS from "../constants/colors";
import { useAuthStore } from "../store/authStore";
import { API_URL } from "../constants/api";

export default function Create() {
  const [title, setTitle] = useState("");
  const [caption, setCaption] = useState("");
  const [rating, setRating] = useState(3);
  const [image, setImage] = useState(null);
  const [imageBase64, setImageBase64] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();
  const { token } = useAuthStore();

  const pickImage = async () => {
    launchImageLibrary(
      {
        mediaType: "photo",
        quality: 0.5,
        includeBase64: true,
      },
      (response) => {
        if (response.didCancel) return;

        if (response.errorCode) {
          Alert.alert("Error", response.errorMessage || "Image picker error");
          return;
        }

        const asset = response.assets[0];
        setImage(asset.uri);
        setImageBase64(asset.base64);
      }
    );
  };

  const handleSubmit = async () => {
    if (!title || !caption || !imageBase64 || !rating) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    try {
      setLoading(true);

      const imageDataUrl = `data:image/jpeg;base64,${imageBase64}`;

      const response = await fetch(`${API_URL}/books`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          caption,
          rating: rating.toString(),
          image: imageDataUrl,
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message);

      Alert.alert("Success", "Book recommendation posted!");
      setTitle("");
      setCaption("");
      setRating(3);
      setImage(null);
      setImageBase64(null);
      navigation.navigate("Home");
    } catch (error) {
      Alert.alert("Error", error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const renderRatingPicker = () => {
    return (
      <View style={styles.ratingContainer}>
        {[1, 2, 3, 4, 5].map((i) => (
          <TouchableOpacity key={i} onPress={() => setRating(i)}>
            <Ionicons
              name={i <= rating ? "star" : "star-outline"}
              size={32}
              color={i <= rating ? "#f4b400" : COLORS.textSecondary}
            />
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.card}>
          <Text style={styles.title}>Add Book Recommendation</Text>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Book Title</Text>
            <TextInput
              style={styles.input}
              value={title}
              onChangeText={setTitle}
              placeholder="Enter book title"
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Your Rating</Text>
            {renderRatingPicker()}
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Book Image</Text>
            <TouchableOpacity onPress={pickImage}>
              {image ? (
                <Image source={{ uri: image }} style={styles.previewImage} />
              ) : (
                <Ionicons name="image-outline" size={40} />
              )}
            </TouchableOpacity>
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Caption</Text>
            <TextInput
              style={styles.textArea}
              value={caption}
              onChangeText={setCaption}
              multiline
            />
          </View>

          <TouchableOpacity
            style={styles.button}
            onPress={handleSubmit}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color={COLORS.white} />
            ) : (
              <Text style={styles.buttonText}>Share</Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
