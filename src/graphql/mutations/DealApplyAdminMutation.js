import gql from 'graphql-tag'

const DealApplyAdminMutation = gql`
  mutation($id: Int!, $status: Int!) {
    dealApplyAdmin(id: $id, status: $status) {
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
