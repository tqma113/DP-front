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
        eduBC {
          school
          degree
          major
        }
        articles {
          id
          titile
          abstract
        }
        categorys {
          id
        }
        concerned_categorys {
          id
        }
        concerned {
          id
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
        eduBC {
          school
          degree
          major
        }
        articles {
          id
          titile
          abstract
        }
        categorys {
          id
        }
        concerned_categorys {
          id
        }
        concerned {
          id
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

export {
  QueryInitData,
  QueryUsers
}
