import gql from 'graphql-tag'

const checkUsernameValidMutation = gql`
  mutation ($username: String!) {
    checkUsernameValid(username: $username) {
      isSuccess
      extension {
        operator
        errors {
          path
          message
        }
      }
    }
  }
`

export default checkUsernameValidMutation
