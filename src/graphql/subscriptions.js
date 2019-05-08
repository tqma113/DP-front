import gql from 'graphql-tag'

const NewMessageSubScription = gql`
  subscription {
    newMessage {
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
  }
`
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

const NewUserLoginSubScription = gql`
  subscription {
    newUserLogin {
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
  }
`

const UserLogoutSubScription = gql`
  subscription {
    userLogout {
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
  }
`

export {
  NewMessageSubScription,
  NewArticleSubScription,
  NewUserLoginSubScription,
  UserLogoutSubScription
}
