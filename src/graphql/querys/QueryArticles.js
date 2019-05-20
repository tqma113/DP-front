import gql from 'graphql-tag'

const QueryArticles = gql`
query ($idList: [Int]) {
  articles (idList: $idList) {
    articles {
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

export default QueryArticles
