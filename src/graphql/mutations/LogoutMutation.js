import gql from 'graphql-tag'

const LogoutMutation = gql`
  mutation {
    logout {
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


export default LogoutMutation
