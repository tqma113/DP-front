import gql from 'graphql-tag'

const SendCommentMutation = gql`
  mutation($content: String!, $articleId: Int!) {
    sendComment(content: $content, articleId: $articleId) {
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

export default SendCommentMutation
