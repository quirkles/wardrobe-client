import gql from 'graphql-tag'

export const EDIT_GARMENT_DATA = gql`
  query EditGarmentData($garmentId: String!) {
    garmentData: getGarmentById(garmentId: $garmentId) {
    ...on Garment {
        id
        title
        description
        category {
          id
        }
        subCategory {
          id
        }
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
        images {
          id
          url
        }
      }
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
