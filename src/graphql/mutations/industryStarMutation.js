import gql from 'graphql-tag'

const industryStarMutation = gql`
  mutation($industryId: Int!, $status: Boolean!) {
    industryStar(industryId: $industryId, status: $status) {
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

export default industryStarMutation
