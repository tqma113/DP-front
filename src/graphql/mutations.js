import gql from 'graphql-tag'

const LoginMutation = gql`
  mutation ($username: String!, $password: String!) {
    login (username: $username, password: $password) {
      token
      username
      isSuccess
      extension {
        operator
        errors{
          path
          message
        }
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
    isSuccess
    token
    username
    extension {
        operator
        errors{
          path
          message
        }
      }
  }
`

export {
  LoginMutation,
  RegisterMutation
}
