import gql from 'graphql-tag'

const RegisterMutation = gql`
  mutation ($username: String!,
            $nickname: String!,
            $location: String!,
            $birthday: Date!
            $email: String!,
            $gender: String!
            $statement: String!
            $u_key: String!,
            $e_key: String!
            $avatar: String!) {
    register (username: $username,
              nickname: $nickname,
              location: $location,
              birthday: $birthday,
              gender: $gender
              email: $email,
              statement: $statement,
              u_key: $u_key,
              e_key: $e_key,
              avatar: $avatar) {
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

export default RegisterMutation
