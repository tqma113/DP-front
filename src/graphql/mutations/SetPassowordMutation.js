import gql from 'graphql-tag'

const SetPassowordMutation = gql`
  mutation ($email: String!, $password: String!, $key: String!){
    setPassword(email: $email, password: $password, key: $key) {
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

export default SetPassowordMutation
