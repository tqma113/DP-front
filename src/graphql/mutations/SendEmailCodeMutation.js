import gql from 'graphql-tag'

const SendEmailCodeMutation = gql`
  mutation ($email: String!) {
    sendEmailCode(email: $email) {
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

export default SendEmailCodeMutation
