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
import { useDispatch, useSelector } from "react-redux";

import styles from "../assets/styles/create.styles";
import COLORS from "../constants/colors";
import { createBook } from "../store/booksSlice";

export default function Create() {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const { loading } = useSelector((state) => state.books);

  const [title, setTitle] = useState("");
  const [caption, setCaption] = useState("");
  const [rating, setRating] = useState(3);
  const [image, setImage] = useState(null);
  const [imageBase64, setImageBase64] = useState(null);

  /* ================= PICK IMAGE ================= */
  const pickImage = () => {
    launchImageLibrary(
      {
        mediaType: "photo",
        quality: 0.5,
        includeBase64: true,
      },
      (response) => {
        if (response.didCancel) return;

        if (response.errorCode) {
          Alert.alert("Error", response.errorMessage);
          return;
        }

        const asset = response.assets[0];
        setImage(asset.uri);
        setImageBase64(asset.base64);
      }
    );
  };

  /* ================= SUBMIT ================= */
  const handleSubmit = async () => {
    if (!title || !caption || !imageBase64) {
      Alert.alert("Error", "Please fill all fields");
      return;
    }

    const result = await dispatch(
      createBook({ title, caption, rating, imageBase64 })
    );

    if (createBook.rejected.match(result)) {
      Alert.alert("Error", result.payload);
    } else {
      Alert.alert("Success", "Book recommendation posted!");
      setTitle("");
      setCaption("");
      setRating(3);
      setImage(null);
      setImageBase64(null);
      navigation.navigate("Home");
    }
  };

  /* ================= RATING ================= */
  const renderRatingPicker = () => (
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

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.card}>
          <Text style={styles.title}>Add Book Recommendation</Text>

          <TextInput
            style={styles.input}
            placeholder="Book Title"
            value={title}
            onChangeText={setTitle}
          />

          {renderRatingPicker()}

          <TouchableOpacity onPress={pickImage}>
            {image ? (
              <Image source={{ uri: image }} style={styles.previewImage} />
            ) : (
              <Ionicons name="image-outline" size={40} />
            )}
          </TouchableOpacity>

          <TextInput
            style={styles.textArea}
            placeholder="Caption"
            value={caption}
            onChangeText={setCaption}
            multiline
          />

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
