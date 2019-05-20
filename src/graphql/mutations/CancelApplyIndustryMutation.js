import gql from 'graphql-tag'

const DealApplyIndustryMutation = gql`
  mutation($id: Int!) {
    cancelApplyAddIndustry(id: $id) {
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

export default DealApplyIndustryMutation
