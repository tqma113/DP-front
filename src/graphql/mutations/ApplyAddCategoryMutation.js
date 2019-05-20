import gql from 'graphql-tag'

const ApplyAddCategoryMutation = gql`
  mutation($subject: String!, $description: String!, $image: String) {
    logout(subject: $subject, description: $description, image: $image) {
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

export default ApplyAddCategoryMutation
