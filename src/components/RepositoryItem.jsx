import { View, Image, StyleSheet } from "react-native";
import Text from "./Text";
import theme from "../theme";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 15,
    backgroundColor: "white",
  },
  avatarContainer: {
    paddingRight: 15,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 5,
  },
  contentContainer: {
    flex: 1,
  },
  languageTag: {
    backgroundColor: theme.colors.primary,
    color: theme.colors.white,
    padding: 5,
    borderRadius: 5,
    alignSelf: "flex-start",
    marginTop: 5,
  },
  countsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10,
  },
  countItem: {
    alignItems: "center",
  },
});

const formatCount = (count) => {
  if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}k`;
  }
  return count.toString();
};

const RepositoryItem = ({ item }) => {
  return (
    <View style={styles.container}>
      <View style={styles.avatarContainer}>
        <Image style={styles.avatar} source={{ uri: item.ownerAvatarUrl }} />
      </View>
      <View style={styles.contentContainer}>
        <Text fontWeight="bold" fontSize="subheading">
          {item.fullName}
        </Text>
        <Text color="textSecondary">{item.description}</Text>
        <Text style={styles.languageTag}>{item.language}</Text>
        <View style={styles.countsContainer}>
          <View style={styles.countItem}>
            <Text fontWeight="bold">{formatCount(item.stargazersCount)}</Text>
            <Text color="textSecondary">Stars</Text>
          </View>
          <View style={styles.countItem}>
            <Text fontWeight="bold">{formatCount(item.forksCount)}</Text>
            <Text color="textSecondary">Forks</Text>
          </View>
          <View style={styles.countItem}>
            <Text fontWeight="bold">{item.reviewCount}</Text>
            <Text color="textSecondary">Reviews</Text>
          </View>
          <View style={styles.countItem}>
            <Text fontWeight="bold">{item.ratingAverage}</Text>
            <Text color="textSecondary">Rating</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default RepositoryItem;
