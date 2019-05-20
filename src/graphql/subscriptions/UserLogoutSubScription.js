import gql from 'graphql-tag'

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

export default UserLogoutSubScription
