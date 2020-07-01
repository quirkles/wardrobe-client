import gql from 'graphql-tag'

export const LOGIN = gql`
  mutation Login($password: String!, $email: String!) {
    loginUser(password: $password, email: $email) {
      ... on UserAndToken {
        user {
          id
          email
        }
        token
      }
      ... on UserNotFoundError {
        reason
      }
      ... on FallBackServerError {
        reason
        message
      }
    }
  }
`
