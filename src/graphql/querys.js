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
        industry {
          name
          description
          id
        }
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
          release_at
          categorys {
            id
          }
          industrys {
            id
          }
          comments {
            id
          }
          likes
          collections
        }
        categorys {
          id
        }
        concerned_categorys {
          id
        }
        concerned {
          id
          username
        }
        likes {
          id
        }
        collections {
          id
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
      }
    }
  }
`
const QueryUsers = gql`
  query ($usernames: [String!]!) {
    users (usernames: $usernames) {
      users {
        id
        username
        nickname
        location
        gender
        birthday
        industry {
          name
          description
          id
        }
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
          release_at
          categorys {
            id
          }
          industrys {
            id
          }
          comments {
            id
          }
          likes
          collections
        }
        categorys {
          id
        }
        concerned_categorys {
          id
        }
        concerned {
          id
          username
        }
        likes {
          id
        }
        collections {
          id
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
  query ($idList: [Int!]!) {
    articles (idList: $idList) {
      id
      title
      abstract
      content
      release_at
      last_modify_at
      user {
        id
        username
      }
      project_link
      categorys {
        id
      }
      industrys {
        id
      }
      comments {
        id
      }
      likes
      collections
    }
  }
`

export {
  QueryInitData,
  QueryUsers,
  QueryArticles
}
