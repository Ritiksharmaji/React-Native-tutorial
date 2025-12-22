import { useEffect, useState } from "react";
import {
  View,
  Alert,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useDispatch, useSelector } from "react-redux";

import styles from "../assets/styles/profile.styles";
import ProfileHeader from "../components/ProfileHeader";
import LogoutButton from "../components/LogoutButton";
import COLORS from "../constants/colors";
import Loader from "../components/Loader";
import { fetchUserBooks, deleteBook } from "../store/booksSlice";

// small delay for smooth refresh UX
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export default function Profile() {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const {
    userBooks,
    loading,
    deletingId,
  } = useSelector((state) => state.books);

  const [refreshing, setRefreshing] = useState(false);

  // Initial fetch
  useEffect(() => {
    dispatch(fetchUserBooks());
  }, []);

  // Confirm delete alert
  const confirmDelete = (bookId) => {
    Alert.alert(
      "Delete Recommendation",
      "Are you sure you want to delete this book?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => dispatch(deleteBook(bookId)),
        },
      ]
    );
  };

  // Pull to refresh
  const handleRefresh = async () => {
    setRefreshing(true);
    await sleep(400);
    dispatch(fetchUserBooks());
    setRefreshing(false);
  };

  // Rating stars
  const renderRatingStars = (rating) =>
    Array.from({ length: 5 }, (_, i) => (
      <Ionicons
        key={i}
        name={i + 1 <= rating ? "star" : "star-outline"}
        size={14}
        color={i + 1 <= rating ? "#f4b400" : COLORS.textSecondary}
        style={{ marginRight: 2 }}
      />
    ));

  // Single book item
  const renderBookItem = ({ item }) => (
    <View style={styles.bookItem}>
      {/* Book Image */}
      <Image source={{ uri: item.image }} style={styles.bookImage} />

      {/* Book Info */}
      <View style={styles.bookInfo}>
        <Text style={styles.bookTitle}>{item.title}</Text>

        <View style={styles.ratingContainer}>
          {renderRatingStars(item.rating)}
        </View>

        <Text style={styles.bookCaption} numberOfLines={2}>
          {item.caption}
        </Text>

        <Text style={styles.bookDate}>
          {new Date(item.createdAt).toLocaleDateString()}
        </Text>
      </View>

      {/* Delete Button */}
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => confirmDelete(item._id)}
      >
        {deletingId === item._id ? (
          <ActivityIndicator size="small" color={COLORS.primary} />
        ) : (
          <Ionicons
            name="trash-outline"
            size={20}
            color={COLORS.primary}
          />
        )}
      </TouchableOpacity>
    </View>
  );

  // Initial loader
  if (loading && !refreshing) {
    return <Loader />;
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <ProfileHeader />
      <LogoutButton />

      {/* Section title */}
      <View style={styles.booksHeader}>
        <Text style={styles.booksTitle}>Your Recommendations 📚</Text>
        <Text style={styles.booksCount}>
          {userBooks.length} books
        </Text>
      </View>

      {/* Book List */}
      <FlatList
        data={userBooks}
        keyExtractor={(item) => item._id}
        renderItem={renderBookItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            colors={[COLORS.primary]}
            tintColor={COLORS.primary}
          />
        }
        ListEmptyComponent={
          !loading && (
            <View style={styles.emptyContainer}>
              <Ionicons
                name="book-outline"
                size={50}
                color={COLORS.textSecondary}
              />
              <Text style={styles.emptyText}>
                No recommendations yet
              </Text>
              <TouchableOpacity
                style={styles.addButton}
                onPress={() => navigation.navigate("Create")}
              >
                <Text style={styles.addButtonText}>
                  Add Your First Book
                </Text>
              </TouchableOpacity>
            </View>
          )
        }
      />
    </View>
  );
}
