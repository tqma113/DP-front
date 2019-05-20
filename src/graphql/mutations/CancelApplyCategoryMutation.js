import gql from 'graphql-tag'

const DealApplyCategoryMutation = gql`
  mutation($id: Int!) {
    cancelApplyAddCategory(id: $id) {
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
