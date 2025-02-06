import React, { useState } from "react";
import { FlatList, View, StyleSheet, Pressable, TextInput } from "react-native";
import { useNavigate } from "react-router-native";
import { Picker } from "@react-native-picker/picker";
import RepositoryItem from "./RepositoryItem";
import useRepositories from "../hooks/useRepositories";
import { useDebounce } from "use-debounce";

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  headerContainer: {
    padding: 10,
    backgroundColor: "white",
  },
  searchBar: {
    height: 40,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  picker: {
    height: 40,
    padding: 3,
    border: 'none'
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryListHeader = ({
  searchKeyword,
  setSearchKeyword,
  sortOrder,
  setSortOrder,
}) => {
  return (
    <View style={styles.headerContainer}>
      <TextInput
        style={styles.searchBar}
        placeholder="Search repositories"
        value={searchKeyword}
        onChangeText={setSearchKeyword}
      />
      <Picker
        selectedValue={sortOrder}
        onValueChange={(itemValue) => setSortOrder(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Latest repositories" value="latest" />
        <Picker.Item label="Highest rated repositories" value="highestRated" />
        <Picker.Item label="Lowest rated repositories" value="lowestRated" />
      </Picker>
    </View>
  );
};

export class RepositoryListContainer extends React.Component {
  renderHeader = () => {
    const { searchKeyword, setSearchKeyword, sortOrder, setSortOrder } =
      this.props;
    return (
      <RepositoryListHeader
        searchKeyword={searchKeyword}
        setSearchKeyword={setSearchKeyword}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
      />
    );
  };

  render() {
    const { repositories, navigate } = this.props;
    const repositoryNodes = repositories
      ? repositories.edges.map((edge) => edge.node)
      : [];

    return (
      <FlatList
        data={repositoryNodes}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={({ item }) => (
          <Pressable onPress={() => navigate(`/repository/${item.id}`)}>
            <RepositoryItem item={item} showGitHubButton={false} />
          </Pressable>
        )}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={this.renderHeader}
      />
    );
  }
}

const RepositoryList = () => {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [debouncedSearchKeyword] = useDebounce(searchKeyword, 500);
  const [sortOrder, setSortOrder] = useState("latest");
  const navigate = useNavigate();

  const getSortOptions = () => {
    switch (sortOrder) {
      case "highestRated":
        return { orderBy: "RATING_AVERAGE", orderDirection: "DESC" };
      case "lowestRated":
        return { orderBy: "RATING_AVERAGE", orderDirection: "ASC" };
      default:
        return { orderBy: "CREATED_AT", orderDirection: "DESC" };
    }
  };

  const { repositories } = useRepositories({
    searchKeyword: debouncedSearchKeyword,
    ...getSortOptions(),
  });

  return (
    <RepositoryListContainer
      repositories={repositories}
      navigate={navigate}
      searchKeyword={searchKeyword}
      setSearchKeyword={setSearchKeyword}
      sortOrder={sortOrder}
      setSortOrder={setSortOrder}
    />
  );
};

export default RepositoryList;
