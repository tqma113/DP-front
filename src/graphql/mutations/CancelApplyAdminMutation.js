import gql from 'graphql-tag'

const DealApplyAdminMutation = gql`
  mutation($id: Int!) {
    cancelApplyAdmin(id: $id) {
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

export default DealApplyAdminMutation
