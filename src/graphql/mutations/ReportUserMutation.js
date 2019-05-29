import gql from 'graphql-tag'

const ReportUserMutation = gql`
  mutation($userId: Int!, $reason: String!) {
    reportUser(userId: $userId, reason: $reason) {
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

export default ReportUserMutation
