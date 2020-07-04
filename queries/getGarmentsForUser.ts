import gql from 'graphql-tag'

export const GET_GARMENTS_FOR_USER = gql`
  query GetGarmentsForUser($userId: String!) {
    getUserById(userId: $userId) {
      ... on User {
        garments {
          id
          title
          description
          brand {
            name
          }
          subCategory {
            name
          }
        }
      }
    }
  }
`
