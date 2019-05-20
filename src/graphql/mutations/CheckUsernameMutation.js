import gql from 'graphql-tag'

const CheckUsernameMutation = gql`
  mutation ($username: String!) {
    checkUsername(username: $username) {
      key
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

export default CheckUsernameMutation
