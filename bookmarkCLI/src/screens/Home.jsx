import { useEffect, useContext } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  RefreshControl,
  Image,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

import styles from "../assets/styles/home.styles";
import COLORS from "../constants/colors";
import { BooksContext } from "../contexts/BooksContext"; // ✅ context
import { formatPublishDate } from "../lib/utils";
import Loader from "../components/Loader";

export default function Home() {
  const {
    books,
    loading,
    refreshing,
    page,
    hasMore,
    fetchBooks,
  } = useContext(BooksContext);

  // Initial load
  useEffect(() => {
    fetchBooks({ page: 1 });
  }, []);

  // Pagination
  const handleLoadMore = () => {
    if (hasMore && !loading && !refreshing) {
      fetchBooks({ page: page + 1 });
    }
  };

  // Rating stars
  const renderRatingStars = (rating) =>
    Array.from({ length: 5 }, (_, i) => (
      <Ionicons
        key={i}
        name={i + 1 <= rating ? "star" : "star-outline"}
        size={16}
        color={i + 1 <= rating ? "#f4b400" : COLORS.textSecondary}
        style={{ marginRight: 2 }}
      />
    ));

  // Single book card
  const renderItem = ({ item }) => (
    <View style={styles.bookCard}>
      {/* USER HEADER */}
      <View style={styles.bookHeader}>
        <View style={styles.userInfo}>
          <Image
            source={{ uri: item.user.profileImage }}
            style={styles.avatar}
          />
          <Text style={styles.username}>{item.user.username}</Text>
        </View>
      </View>

      {/* BOOK IMAGE */}
      <View style={styles.bookImageContainer}>
        <Image
          source={{ uri: item.image }}
          style={styles.bookImage}
          resizeMode="cover"
        />
      </View>

      {/* DETAILS */}
      <View style={styles.bookDetails}>
        <Text style={styles.bookTitle}>{item.title}</Text>

        <View style={styles.ratingContainer}>
          {renderRatingStars(item.rating)}
        </View>

        <Text style={styles.caption}>{item.caption}</Text>

        <Text style={styles.date}>
          Shared on {formatPublishDate(item.createdAt)}
        </Text>
      </View>
    </View>
  );

  // First load
  if (loading && books.length === 0) {
    return <Loader />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={books}
        keyExtractor={(item) => item._id}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}

        /* Pull to refresh */
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => fetchBooks({ page: 1, refresh: true })}
            colors={[COLORS.primary]}
            tintColor={COLORS.primary}
          />
        }

        /* Infinite scroll */
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.1}

        /* Header */
        ListHeaderComponent={
          <View style={styles.header}>
            <Text style={styles.headerTitle}>BookWorm 🐛</Text>
            <Text style={styles.headerSubtitle}>
              Discover great reads from the community 👇
            </Text>
          </View>
        }

        /* Footer loader */
        ListFooterComponent={
          hasMore && books.length > 0 ? (
            <ActivityIndicator
              style={styles.footerLoader}
              size="small"
              color={COLORS.primary}
            />
          ) : null
        }

        /* Empty state */
        ListEmptyComponent={
          !loading && (
            <View style={styles.emptyContainer}>
              <Ionicons
                name="book-outline"
                size={60}
                color={COLORS.textSecondary}
              />
              <Text style={styles.emptyText}>No recommendations yet</Text>
              <Text style={styles.emptySubtext}>
                Be the first to share a book!
              </Text>
            </View>
          )
        }
      />
    </View>
  );
}
