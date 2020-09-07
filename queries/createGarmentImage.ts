import gql from 'graphql-tag'

export const CREATE_GARMENT_IMAGE = gql`
  mutation CreateGarmentImage($garmentImageData: CreateGarmentImageInput!) {
    createGarmentImage(garmentImageData: $garmentImageData) {
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
