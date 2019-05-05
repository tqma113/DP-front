import gql from 'graphql-tag'

const NewMessageSubScription = gql`
  subscription($userId: Int!) {
    newMessage(userId: $userId) {
      message {
        sendUser {
          id
          username
          nickname
          avatar
        }
        acceptUser {
          id
          username
          nickname
          avatar
        }
        content
        send_time
      }
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

export {
  NewMessageSubScription
}
