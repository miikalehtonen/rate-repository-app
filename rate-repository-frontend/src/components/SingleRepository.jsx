import React from "react";
import { useParams } from "react-router-native";
import { FlatList, StyleSheet, View } from "react-native";
import { useQuery } from "@apollo/client";
import RepositoryItem from "./RepositoryItem";
import Text from "./Text";
import { GET_REPOSITORY } from "../graphql/queries";
import { format } from "date-fns";

const styles = StyleSheet.create({
  separator: {
    height: 10,
    backgroundColor: "#e1e4e8",
  },
  reviewContainer: {
    flexDirection: "row",
    backgroundColor: "white",
    padding: 15,
  },
  ratingContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: "#0366d6",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 15,
  },
  reviewContent: {
    flex: 1,
  },
  username: {
    fontWeight: "bold",
    marginBottom: 5,
  },
  date: {
    color: "#586069",
    marginBottom: 10,
  },
  reviewText: {
    color: "#24292e",
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryInfo = ({ repository }) => (
  <View>
    <RepositoryItem item={repository} showGitHubButton={true} />
  </View>
);

const ReviewItem = ({ review }) => (
  <View style={styles.reviewContainer}>
    <View style={styles.ratingContainer}>
      <Text fontWeight="bold" color="primary">
        {review.rating}
      </Text>
    </View>
    <View style={styles.reviewContent}>
      <Text style={styles.username}>{review.user.username}</Text>
      <Text style={styles.date}>
        {format(new Date(review.createdAt), "dd.MM.yyyy")}
      </Text>
      <Text style={styles.reviewText}>{review.text}</Text>
    </View>
  </View>
);

const SingleRepository = () => {
  const { id } = useParams();
  const { data, loading, error, fetchMore } = useQuery(GET_REPOSITORY, {
    variables: { id, first: 5 },
    fetchPolicy: "cache-and-network",
  });

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  const repository = data.repository;
  const reviews = repository.reviews.edges.map((edge) => edge.node);

  const onEndReach = () => {
    if (repository.reviews.pageInfo.hasNextPage) {
      fetchMore({
        variables: {
          id,
          first: 5,
          after: repository.reviews.pageInfo.endCursor,
        },
      });
    }
  };

  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ id }) => id}
      ListHeaderComponent={() => <RepositoryInfo repository={repository} />}
      ItemSeparatorComponent={ItemSeparator}
      onEndReached={onEndReach}
      onEndReachedThreshold={0.5}
    />
  );
};

export default SingleRepository;
