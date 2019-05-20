import gql from 'graphql-tag'

const AckEmailCodeMutation = gql`
  mutation ($email: String!, $code: String!, $key: String!) {
    ackEmail(email: $email, code: $code, key: $key) {
      key
      isSuccess
      extension{
        operator
        errors{
          path
          message
        }
      }
    }
  }
`

export default AckEmailCodeMutation
