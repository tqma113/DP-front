import gql from 'graphql-tag'

const DealReportUserMutation = gql`
  mutation($id: Int!, $status: Int!) {
    reportUser(id: $id, status: $status) {
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

export default DealReportUserMutation
