import gql from 'graphql-tag'

const ChangeApplyAdminMutation = gql`
  mutation($id: Int!, $reason: String!) {
    changeApplyAdmin(id: $id, reason: $reason) {
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
