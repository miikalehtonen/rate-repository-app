import { View, StyleSheet, ScrollView } from "react-native";
import { Link } from "react-router-native";
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

const AppBarTab = ({ text, to }) => (
  <Link to={to} style={styles.tab}>
    <Text color="white" fontWeight="bold">
      {text}
    </Text>
  </Link>
);

const AppBar = () => {
  return (
    <View style={styles.container}>
      <ScrollView horizontal style={styles.scrollContainer}>
        <AppBarTab text="Repositories" to="/" />
        <AppBarTab text="Sign In" to="/signin" />
      </ScrollView>
    </View>
  );
};

export default AppBar;
