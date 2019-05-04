import gql from 'graphql-tag'

const QueryInitData = gql`
  query ($username: ID!, $token: String!) {
    checkLoginState (username: $username, token: $token) {
      sessionInfo {
        token
        username
        isRefresh
      }
      user {
        id
        username
        nickname
        location
        gender
        birthday
        industrys
        register_at
        last_login_at
        avatar
        statement
        email
        eduBG {
          id
          school
          degree
          major
        }
        emRecords {
          id
          company
          position
        }
        articles {
          id
          title
          abstract
          release_time
          last_modify_time
          categorys
          comments {
            id
            content
            user_id
          }
          likes {
            id
          }
          collections {
            id
          }
        }
        categorys
        concerned {
          id
          user_id
          concerned_user_id
          user {
            id
            username
            nickname
            avatar
            categorys
            industrys
            statement
          }
        }
        concern {
          id
          user_id
          concerned_user_id
          user {
            id
            username
            nickname
            avatar
            categorys
            industrys
            statement
          }
        }
        likes {
          id
          article_id
          user_id
          create_time
          article {
            id
            title
            abstract
            release_time
            last_modify_time
          }
        }
        collections {
          id
          article_id
          user_id
          create_time
          article {
            id
            title
            abstract
            release_time
            last_modify_time
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
    categorys {
      isSuccess
      categorys {
        id
        subject
        description
        image
        users
      }
      extension {
        operator
        errors{
          path
          message
        }
      }
    }
    industrys {
      isSuccess
      industrys {
        id
        name
        description
        image
        users
      }
    }
  }
`
const QueryUsers = gql`
  query ($usernames: [String]) {
    users (usernames: $usernames) {
      users {
        id
        username
        nickname
        location
        gender
        birthday
        industrys
        register_at
        last_login_at
        avatar
        statement
        email
        eduBG {
          school
          degree
          major
        }
        emRecords {
          id
          company
          position
        }
        articles {
          id
          title
          abstract
          release_time
          last_modify_time
          categorys
          comments {
            id
            user_id
          }
          likes {
            id
            article_id
            user_id
            create_time
          }
          collections {
            id
            article_id
            user_id
            create_time
          }
        }
        categorys
        concerned {
          id
          user_id
          concerned_user_id
          user {
            id
            username
            nickname
            avatar
            categorys
            industrys
            statement
          }
        }
        concern {
          id
          user_id
          concerned_user_id
          user {
            id
            username
            nickname
            avatar
            categorys
            industrys
            statement
          }
        }
        likes  {
          id
          article_id
          user_id
          create_time
          article {
            id
            title
            abstract
            release_time
            last_modify_time
          }
        }
        collections  {
          id
          article_id
          user_id
          create_time
          article {
            id
            title
            abstract
            release_time
            last_modify_time
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

const QueryArticles = gql`
  query ($idList: [Int]) {
    articles (idList: $idList) {
      articles {
        id
        title
        abstract
        content
        release_time
        last_modify_time
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

export {
  QueryInitData,
  QueryUsers,
  QueryArticles
}
