import React from "react";
import {
  View,
  StyleSheet,
  FlatList,
  Alert,
  Pressable,
  Linking,
} from "react-native";
import { useQuery, useMutation } from "@apollo/client";
import { ME } from "../graphql/queries";
import { DELETE_REVIEW } from "../graphql/mutations";
import Text from "./Text";
import theme from "../theme";
import { format } from "date-fns";

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: "white",
  },
  reviewItem: {
    padding: 15,
    backgroundColor: "white",
    marginBottom: 10,
    borderRadius: 5,
  },
  ratingContainer: {
    flexDirection: "row",
    marginBottom: 10,
  },
  rating: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: theme.colors.primary,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  ratingText: {
    color: theme.colors.primary,
    fontWeight: theme.fontWeights.bold,
    fontSize: theme.fontSizes.subheading,
  },
  reviewContent: {
    flex: 1,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  button: {
    flex: 1,
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginHorizontal: 5,
  },
  viewButton: {
    backgroundColor: theme.colors.primary,
  },
  deleteButton: {
    backgroundColor: "#ff0000",
  },
  buttonText: {
    color: theme.colors.white,
    fontWeight: theme.fontWeights.bold,
  },
});

const ReviewItem = ({ review, refetch }) => {
  const [deleteReview] = useMutation(DELETE_REVIEW);

  const handleDelete = () => {
    Alert.alert(
      "Delete review",
      "Are you sure you want to delete this review?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              await deleteReview({ variables: { id: review.id } });
              refetch();
            } catch (error) {
              console.error("Error deleting review:", error.message);
            }
          },
        },
      ]
    );
  };

  const handleViewRepository = () => {
    if (review.repository.url) {
      Linking.openURL(review.repository.url);
    } else {
      console.error("Repository URL is missing");
    }
  };

  return (
    <View style={styles.reviewItem}>
      <View style={styles.ratingContainer}>
        <View style={styles.rating}>
          <Text style={styles.ratingText}>{review.rating}</Text>
        </View>
        <View style={styles.reviewContent}>
          <Text fontWeight="bold">{review.repository.fullName}</Text>
          <Text color="textSecondary">
            {format(new Date(review.createdAt), "dd.MM.yyyy")}
          </Text>
          <Text>{review.text}</Text>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <Pressable
          style={[styles.button, styles.viewButton]}
          onPress={handleViewRepository}
        >
          <Text style={styles.buttonText}>View repository</Text>
        </Pressable>
        <Pressable
          style={[styles.button, styles.deleteButton]}
          onPress={handleDelete}
        >
          <Text style={styles.buttonText}>Delete review</Text>
        </Pressable>
      </View>
    </View>
  );
};

const UserReviews = () => {
  const { data, loading, refetch } = useQuery(ME, {
    variables: { includeReviews: true },
    fetchPolicy: "cache-and-network",
  });

  if (loading) return <Text>Loading...</Text>;

  const reviews = data?.me?.reviews.edges.map((edge) => edge.node) || [];

  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => <ReviewItem review={item} refetch={refetch} />}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.container}
    />
  );
};

export default UserReviews;
