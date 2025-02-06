import { View, Image, StyleSheet, Pressable, Linking } from "react-native";
import Text from "./Text";
import theme from "../theme";

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
    padding: 15,
    backgroundColor: "white",
  },
  avatarContainer: {
    paddingRight: 15,
  },
  header: {
    flexDirection: "row",
    marginBottom: 10,
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
    paddingVertical: 5,
    paddingHorizontal: 10,
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
  button: {
    backgroundColor: theme.colors.primary,
    padding: 15,
    borderRadius: 5,
    marginTop: 10,
    alignItems: "center",
  },
  buttonText: {
    color: theme.colors.white,
    fontWeight: theme.fontWeights.bold,
  },
});

const formatCount = (count) => {
  if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}k`;
  }
  return count.toString();
};

const RepositoryItem = ({ item, showGitHubButton }) => {
  return (
    <View testID="repositoryItem" style={styles.container}>
      <View style={styles.header}>
        <View style={styles.avatarContainer}>
          <Image style={styles.avatar} source={{ uri: item.ownerAvatarUrl }} />
        </View>
        <View style={styles.contentContainer}>
          <Text fontWeight="bold" fontSize="subheading">
            {item.fullName}
          </Text>
          <Text color="textSecondary" style={{ marginVertical: 5 }}>
            {item.description}
          </Text>
          <Text style={styles.languageTag}>{item.language}</Text>
        </View>
      </View>
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
      {showGitHubButton && (
        <Pressable
          style={styles.button}
          onPress={() => Linking.openURL(item.url)}
        >
          <Text style={styles.buttonText}>Open in GitHub</Text>
        </Pressable>
      )}
    </View>
  );
};

export default RepositoryItem;
