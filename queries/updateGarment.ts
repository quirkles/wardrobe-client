import gql from 'graphql-tag'

export const UPDATE_GARMENT = gql`
  mutation UpdateGarment($garmentData: UpdateGarmentInput!) {
    garmentData: updateGarment(garmentData: $garmentData) {
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
        color {
          name
        }
      }
      ... on UnauthorizedError {
        message
      }
    }
  }
`
