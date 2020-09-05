import gql from 'graphql-tag'

export const CreateGarmentImage = gql`
  mutation CreateGarmentImage($input: CreateGarmentImageInput!) {
    loginUser(input: $input) {
      ... on GarmentImage {
        id
        url
        name
        garment {
          id
        }
      }
      ... on InvalidGarmentError {
        reason
      }
      ... on UnauthorizedError {
        reason
        message
      }
      ... on FallBackServerError {
        reason
        message
      }
    }
  }
`
