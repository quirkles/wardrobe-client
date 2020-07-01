import gql from 'graphql-tag'

export const SIGNUP = gql`
  mutation Signup($createUserInput: CreateUserInput!) {
    createUser(input: $createUserInput) {
      ... on UserAndToken {
        user {
          id
          email
        }
        token
      }
      ... on DuplicateUserError {
        reason
      }
      ... on FallBackServerError {
        reason
        message
      }
    }
  }
`
