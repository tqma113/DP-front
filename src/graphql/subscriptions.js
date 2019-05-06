import gql from 'graphql-tag'

const NewMessageSubScription = gql`
  subscription {
    newMessage {
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
  }
`

export {
  NewMessageSubScription
}
