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

const RegisterMutation = gql`
  mutation ($username: String!,
            $nickname: String!,
            $address: String!,
            $birthday: Date!
            $email: String!,
            $gender: String!
            $statement: String!
            $u_key: String!,
            $e_key: String!
            $hd_portrial: String!) {
    register (username: $username,
              nickname: $nickname,
              address: $address,
              birthday: $birthday,
              gender: $gender
              email: $email,
              statement: $statement,
              u_key: $u_key,
              e_key: $e_key,
              hd_portrial: $hd_portrial) {
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
  }
`

const UploadImageMutation = gql`
  mutation ($image: Upload!) {
    uploadSingleImage(image: $image) {
      url
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

const CheckUsernameMutation = gql`
  mutation ($username: String!) {
    checkUsername(username: $username) {
      key
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
  LoginMutation,
  RegisterMutation,
  UploadImageMutation,
  SendEmailCodeMutation,
  AckEmailCodeMutation,
  CheckUsernameMutation,
  SendEmailLoginCodeMutation,
  LoginWithEmailMutation
}
