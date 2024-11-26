import { View, StyleSheet, ScrollView, Pressable } from "react-native";
import { Link } from "react-router-native";
import { useQuery } from "@apollo/client";
import { ME } from "../graphql/queries";
import useSignOut from "../hooks/useSignOut";
import Text from "./Text";
import Constants from "expo-constants";
import theme from "../theme";

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    padding: 10,
    backgroundColor: theme.colors.appBarBackground,
    flexDirection: "row",
  },
  scrollContainer: {
    flexDirection: "row",
  },
  tab: {
    marginHorizontal: 10,
  },
});

const AppBarTab = ({ text, to, onPress }) => {
  if (onPress) {
    return (
      <Pressable onPress={onPress} style={styles.tab}>
        <Text color="white" fontWeight="bold">
          {text}
        </Text>
      </Pressable>
    );
  }

  return (
    <Link to={to} style={styles.tab}>
      <Text color="white" fontWeight="bold">
        {text}
      </Text>
    </Link>
  );
};

const AppBar = () => {
  const { data, loading } = useQuery(ME);
  const signOut = useSignOut();

  if (loading) {
    return null;
  }

  const user = data?.me;

  return (
    <View style={styles.container}>
      <ScrollView horizontal style={styles.scrollContainer}>
        <AppBarTab text="Repositories" to="/" />
        {user ? (
          <AppBarTab text="Sign Out" onPress={signOut} />
        ) : (
          <AppBarTab text="Sign In" to="/signin" />
        )}
      </ScrollView>
    </View>
  );
};

export default AppBar;
