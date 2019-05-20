import gql from 'graphql-tag'

const ApplyAddCategoryMutation = gql`
  mutation($anme: String!, $description: String!, $image: String) {
    applyAddIndustry(name: $name, description: $description, image: $image) {
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
