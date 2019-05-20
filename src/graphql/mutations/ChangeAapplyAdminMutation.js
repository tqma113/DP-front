import gql from 'graphql-tag'

const ChangeApplyAdminMutation = gql`
  mutation($reason: String!) {
    changeApplyAdmin(reason: $reason) {
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

export default ChangeApplyAdminMutation
