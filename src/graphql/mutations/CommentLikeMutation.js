import gql from 'graphql-tag'

const CommentLikeMutation = gql`
  mutation($commentId: Int!, $status: Boolean!) {
    commentLike(commentId: $commentId, status: $status) {
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

export default CommentLikeMutation
