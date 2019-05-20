import gql from 'graphql-tag'

const ApplyAdminMutation = gql`
  mutation($reason: String!) {
    logout(reason: $reason) {
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

export default ApplyAdminMutation
