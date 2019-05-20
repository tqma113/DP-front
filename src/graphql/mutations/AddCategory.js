import gql from 'graphql-tag'

const AddCategoryMutation = gql`
  mutation($subject: String!, $description: String!, $image: String) {
    addCategory(subject: $subject, description: $description, image: $image) {
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

export default AddCategoryMutation
