import { useQuery } from "@apollo/client";
import { GET_REPOSITORIES } from "../graphql/queries";

const useRepositories = () => {
  const { loading, error, data } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: "cache-and-network",
  });

  if (error) {
    console.error("Error fetching repositories:", error.message);
  }

  return {
    repositories: data?.repositories,
    loading,
  };
};

export default useRepositories;
