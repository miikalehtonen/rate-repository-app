import { useMutation } from "@apollo/client";
import { AUTHENTICATE } from "../graphql/mutations";
import useAuthStorage from "./useAuthStorage";
import { useApolloClient } from "@apollo/client";

const useSignIn = () => {
  const [mutate, result] = useMutation(AUTHENTICATE);
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();

  const signIn = async ({ username, password }) => {
    try {
      const { data } = await mutate({
        variables: { credentials: { username, password } },
      });

      const accessToken = data.authenticate.accessToken;

      await authStorage.setAccessToken(accessToken);
      await apolloClient.resetStore();

      return data;
    } catch (e) {
      console.error(e);
      throw error;
    }
  };

  return [signIn, result];
};

export default useSignIn;
