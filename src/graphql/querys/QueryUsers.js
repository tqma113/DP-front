import gql from 'graphql-tag'

const QueryUsers = gql`
  query ($usernames: [String], $categoryIds: [Int], $industryIds: [Int]) {
    users (usernames: $usernames, categoryIds: $categoryIds, industryIds: $industryIds) {
      users {
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

export default QueryUsers
