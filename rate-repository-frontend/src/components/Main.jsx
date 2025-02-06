import { StyleSheet, View } from 'react-native';
import { Route, Routes, Navigate } from 'react-router-native';
import AppBar from "./AppBar";
import RepositoryList from "./RepositoryList";
import SingleRepository from "./SingleRepository";
import SignIn from './SignIn';
import SignUpForm from "./SignUpForm";
import ReviewForm from "./ReviewForm";
import theme from '../theme';
import UserReviews from './UserReviews';

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.mainBackground,
    flexGrow: 1,
    flexShrink: 1,
  },
});
const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar />
      <Routes>
        <Route path="/" element={<RepositoryList />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUpForm />} />
        <Route path="/repository/:id" element={<SingleRepository />} />
        <Route path="/create-review" element={<ReviewForm />} />
        <Route path="/my-reviews" element={<UserReviews />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </View>
  );
};

export default Main;
