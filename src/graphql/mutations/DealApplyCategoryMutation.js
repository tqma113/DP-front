import gql from 'graphql-tag'

const DealApplyCategoryMutation = gql`
  mutation($id: Int!, $status: Int!) {
    dealApplyAddCategory(id: $id, status: $status) {
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

export default DealApplyCategoryMutation
