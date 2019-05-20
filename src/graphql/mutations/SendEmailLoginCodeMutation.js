import gql from 'graphql-tag'

const SendEmailLoginCodeMutation = gql`
  mutation ($email: String!) {
    sendEmailLoginCode(email: $email) {
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

export default SendEmailLoginCodeMutation
