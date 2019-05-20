import gql from 'graphql-tag'

const ApplyAdminMutation = gql`
  mutation($reason: String!) {
    applyAdmin(reason: $reason) {
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
