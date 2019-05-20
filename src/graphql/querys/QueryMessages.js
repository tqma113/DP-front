import gql from 'graphql-tag'

const QueryMessages = gql`
  query($userId: Int!) {
    messages(userId: $userId) {
      messages {
        a_user_id
        s_user_id
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

export default QueryMessages
