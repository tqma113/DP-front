import gql from 'graphql-tag'

const AddIndustryMutation = gql`
  mutation($name: String!, $description: String!, $image: String) {
    addIndustry(name: $name, description: $description, image: $image) {
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

export default AddIndustryMutation
