import gql from 'graphql-tag'

export const UPDATE_GARMENT = gql`
  query UpdateGarment($garmentId: String!, $garmentData: UpdateGarmentInput!) {
    garmentData: updateGarment(
      garmentId: $garmentId
      garmentData: $garmentData
    ) {
      ... on Garment {
        id
      }
      ... on UnauthorizedError {
        message
      }
    }
  }
`
