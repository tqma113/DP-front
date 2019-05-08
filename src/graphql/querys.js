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
const QueryUsers = gql`
  query ($usernames: [String], $categoryIds: [Int], $industryIds: [Int]) {
    users (usernames: $usernames, categoryIds: $categoryIds, industryIds: $industryIds) {
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
        status
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
        likes  {
          id
          article_id
          user_id
          create_time
        }
        collections  {
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

const QueryMessages = gql`
  query($userId: Int!) {
    messages(userId: $userId) {
      messages {
        a_user_id
        s_user_id
        sendUser {
          id
          username
          nickname
          avatar
        }
        acceptUser {
          id
          username
          nickname
          avatar
        }
        content
        send_time
      }
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

export {
  QueryInitData,
  QueryUsers,
  QueryArticles,
  QueryMessages
}
