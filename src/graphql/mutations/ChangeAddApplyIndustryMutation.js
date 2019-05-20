import gql from 'graphql-tag'

const ChangeApplyIndustryMutation = gql`
  mutation($id: Int!, $subject: String!, $description: String!, $image: String!) {
    changeApplyAddIndustry(id: $id, subject: $subject, description: $description, image: $image) {
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

export default ChangeApplyIndustryMutation
