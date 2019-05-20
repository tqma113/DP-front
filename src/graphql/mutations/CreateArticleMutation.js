import gql from 'graphql-tag'

const CreateArticleMutation = gql`
  mutation ($title: String!, $abstract: String!, $content: String!, $categoryIds: [Int]!, $image: String!) {
    createArticle(title: $title, abstract: $abstract, content: $content, categoryIds: $categoryIds, image: $image) {
      article {
        id
        title
        abstract
        content
        release_time
        last_modify_time
        categorys
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

export default CreateArticleMutation
