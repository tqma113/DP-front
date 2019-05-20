import gql from 'graphql-tag'

const checkArticleValidMutation = gql`
  mutation($id: Int!, $userId: Int) {
    checkArticleIdValid(id: $id, userId: $userId) {
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

export default checkArticleValidMutation
