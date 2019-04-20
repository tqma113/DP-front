import gql from 'graphql-tag'

const QuerySessionState = gql`
  query ($username: ID!, $token: String!) {
    checkLoginState (username: $username, token: $token) {
      sessionInfo {
        token
        username
        isRefresh
      }
      user{
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
        head_portrait
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
  QuerySessionState
}
