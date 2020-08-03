import gql from 'graphql-tag'

export const CREATE_GARMENT = gql`
  mutation CreateGarment($input: CreateGarmentInput!) {
    createGarment(input: $input) {
      ... on Garment {
        __typename
        id
        title
        description
        owner {
          email
        }
        category {
          name
        }
        subCategory {
          name
          parentCategory {
            name
          }
        }
        brand {
          name
        }
      }
      ... on UnauthorizedError {
        __typename
        reason
      }
      ... on InvalidSubcategoryError {
        __typename
        reason
      }
      ... on InvalidBrandError {
        __typename
        reason
      }
      ... on InvalidOwnerError {
        __typename
        reason
      }
      ... on FallBackServerError {
        __typename
        reason
        message
      }
    }
  }
`
