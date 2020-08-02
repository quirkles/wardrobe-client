import gql from 'graphql-tag'

export const SEARCH_BRANDS = gql`
  query SearchBrands($searchTerm: String!) {
    brands: getBrands(query: $searchTerm) {
      id
      name
    }
  }
`
