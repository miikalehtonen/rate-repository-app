import { gql } from "@apollo/client";

export const GET_REPOSITORIES = gql`
  query GetRepositories(
    $orderBy: AllRepositoriesOrderBy
    $orderDirection: OrderDirection
    $searchKeyword: String
  ) {
    repositories(
      orderBy: $orderBy
      orderDirection: $orderDirection
      searchKeyword: $searchKeyword
    ) {
      edges {
        node {
          id
          name
          ownerName
          createdAt
          fullName
          reviewCount
          ratingAverage
          forksCount
          stargazersCount
          description
          language
          ownerAvatarUrl
        }
      }
    }
  }
`;

export const GET_REPOSITORY = gql`
  query Repository($id: ID!, $first: Int, $after: String) {
    repository(id: $id) {
      id
      fullName
      description
      language
      forksCount
      stargazersCount
      ratingAverage
      reviewCount
      ownerAvatarUrl
      url
      reviews(first: $first, after: $after) {
        edges {
          node {
            id
            text
            rating
            createdAt
            user {
              id
              username
            }
          }
          cursor
        }
        pageInfo {
          endCursor
          startCursor
          hasNextPage
        }
      }
    }
  }
`;

export const ME = gql`
  query Me($includeReviews: Boolean = false, $first: Int, $after: String) {
    me {
      id
      username
      reviews(first: $first, after: $after) @include(if: $includeReviews) {
        edges {
          node {
            id
            text
            rating
            createdAt
            repository {
              id
              fullName
              url
            }
          }
          cursor
        }
        pageInfo {
          endCursor
          startCursor
          hasNextPage
        }
      }
    }
  }
`;
