import gql from 'graphql-tag'

const SendMessageMutation = gql`
  mutation($userId: Int!, $message: String!) {
    sendMessage(userId: $userId, message: $message) {
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

export default SendMessageMutation
