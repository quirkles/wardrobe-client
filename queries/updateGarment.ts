import gql from 'graphql-tag'

export const UPDATE_GARMENT = gql`
  mutation UpdateGarment($garmentData: UpdateGarmentInput!) {
    garmentData: updateGarment(garmentData: $garmentData) {
      ... on Garment {
        id
      }
      ... on UnauthorizedError {
        message
      }
    }
  }
`
