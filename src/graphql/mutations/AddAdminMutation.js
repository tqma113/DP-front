import gql from 'graphql-tag'

const AddAdminMutation = gql`
  mutation($id: Int!) {
    addAdmin(id: $id) {
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

export default AddAdminMutation
