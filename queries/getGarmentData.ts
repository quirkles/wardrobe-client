import gql from 'graphql-tag'

export const GET_GARMENT_DATA = gql`
  query GetGarmentData($garmentId: String!) {
    garmentData: getGarmentById(garmentId: $garmentId) {
      id
      title
      description
      brand {
        id
        name
        slug
      }
      color {
        id
        name
        slug
      }
    }
  }
`
