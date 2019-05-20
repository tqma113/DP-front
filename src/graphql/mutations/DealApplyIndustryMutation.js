import gql from 'graphql-tag'

const DealApplyIndustryMutation = gql`
  mutation($id: Int!, $status: Int!) {
    dealApplyAddIndustry(id: $id, status: $status) {
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
