import gql from 'graphql-tag'

export const GET_GARMENT_METADATA = gql`
  query GetGarmentMetaData {
    brands: getBrands {
      id
      name
      slug
    }
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
