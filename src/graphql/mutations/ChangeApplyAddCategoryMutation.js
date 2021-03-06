import gql from 'graphql-tag'

const ChangeApplyCategoryMutation = gql`
  mutation($id: Int!, $subject: String!, $description: String!, $image: String!) {
    changeApplyAddCategory(id: $id, subject: $subject, description: $description, image: $image) {
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

export default ChangeApplyCategoryMutation
