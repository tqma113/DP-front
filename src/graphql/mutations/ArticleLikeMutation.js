import gql from 'graphql-tag'

const ArticleLikeMutation = gql`
  mutation($articleId: Int!, $status: Boolean!) {
    articleLike(articleId: $articleId, status: $status) {
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

export default ArticleLikeMutation
