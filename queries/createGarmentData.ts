import gql from 'graphql-tag'

export const CREATE_GARMENT_DATA = gql`
  query createGarmentData {
    categories: getCategories {
      id
      name
      slug
      subCategories {
        id
        name
        slug
      }
    }
  }
`
