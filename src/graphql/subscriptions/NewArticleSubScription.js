import gql from 'graphql-tag'

const NewArticleSubScription = gql`
  subscription {
    newArticle {
      id
      title
      abstract
      content
      image
      release_time
      last_modify_time
      user_id
      user {
        id
        username
        nickname
        statement
        avatar
      }
      project_link
      categorys
      industrys
      comments {
        id
        content
        create_time
        likes  {
          id
          user_id
          create_time
          user {
            id
            username
          }
        }
        user {
          id
          avatar
          username
          nickname
        }
        comments
      }
      likes {
        id
        article_id
        user_id
        create_time
        user {
          id
          username
        }

      }
      collections {
        id
        article_id
        user_id
        create_time
        user {
          id
          username
        }
      }
    }
  }
`

export default NewArticleSubScription
