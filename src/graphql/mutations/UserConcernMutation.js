import gql from 'graphql-tag'

const UserConcernMutation = gql`
  mutation($userId: Int!, $status: Boolean!) {
    userConcern(userId: $userId, status: $status) {
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

export default UserConcernMutation
