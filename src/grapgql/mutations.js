import gql from 'graphql-tag'

const LoginMutation = gql`
  mutation ($username: String!, $password: String!) {
    login (username: $username, password: $password) {
      success
      user {
        username
        nickname
        email
        address

      }
      accessToken
      refreshToken
      error {
        path
        message
      }
    }
  }
`

const RegisterMutation = gql`
  mutation ($username: String!,
            $nickname: String!,
            $password: String,
            $email: String!,
            $emialAck: String!,
            $hdUrl: String) {
    success
    user {
      username
      nickname
      email
      address

    }
    accessToken
    refreshToken
    error {
      path
      message
    }
  }
`

export {
  LoginMutation,
  RegisterMutation
}