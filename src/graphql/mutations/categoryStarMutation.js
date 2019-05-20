import gql from 'graphql-tag'

const categoryStarMutation = gql`
  mutation($categoryId: Int!, $status: Boolean!) {
    categoryStar(categoryId: $categoryId, status: $status) {
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

export default categoryStarMutation
