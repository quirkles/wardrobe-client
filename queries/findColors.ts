import gql from 'graphql-tag'

export const SEARCH_COLORS = gql`
  query SearchColors($searchTerm: String!) {
    colors: getColors(query: $searchTerm) {
      id
      name
    }
  }
`
