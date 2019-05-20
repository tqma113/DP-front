import gql from 'graphql-tag'

const ArticleStarMutation = gql`
  mutation($articleId: Int!, $status: Boolean!) {
    articleStar(articleId: $articleId, status: $status) {
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

export default ArticleStarMutation
