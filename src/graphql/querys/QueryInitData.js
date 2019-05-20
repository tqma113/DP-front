import gql from 'graphql-tag'

const QueryInitData = gql`
  query {
    init {
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
        user_type
        birthday
        industrys
        register_at
        last_login_at
        avatar
        statement
        status
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
          image
          release_time
          last_modify_time
        }
        categorys
        concerned {
          id
          user_id
          concerned_user_id
        }
        concern {
          id
          user_id
          concerned_user_id
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

export default QueryInitData
