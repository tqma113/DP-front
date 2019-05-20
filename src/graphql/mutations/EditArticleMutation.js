import gql from 'graphql-tag'

const EditArticleMutation = gql`
  mutation ($id: Int!, $title: String!, $abstract: String!, $content: String!, $categoryIds: [Int]!, $image: String!) {
    editArticle(id: $id, title: $title, abstract: $abstract, content: $content, categoryIds: $categoryIds, image: $image) {
      article {
        id
        title
        abstract
        content
        release_time
        last_modify_time
      }
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

export default EditArticleMutation
