import gql from 'graphql-tag'

const ReportArticleMutation = gql`
  mutation($articleId: Int!, $reason: String!) {
    reportArticle(articleId: $articleId, reason: $reason) {
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

export default ReportArticleMutation
