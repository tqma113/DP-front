import gql from 'graphql-tag'

const LoginWithEmailMutation = gql`
  mutation ($email: String!, $code: String!, $key: String!) {
    loginWithEmail (email: $email, code: $code, key: $key) {
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

export default LoginWithEmailMutation
