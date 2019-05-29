import gql from 'graphql-tag'

const QueryArticles = gql`
query {
  articles {
    articles {
      id
      title
      abstract
      content
      image
      status
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
      industrys
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
  users {
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
      usable
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
  adminApply {
    applications {
      id
      user_id
      apply_time
      deal_user_id
      deal_time
      status
      reason
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
  categoryApply {
    applications {
      id
      user_id
      apply_time
      deal_user_id
      deal_time
      status
      subject
      description
      image
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
  industryApply {
    applications {
      id
      user_id
      apply_time
      deal_user_id
      deal_time
      status
      name
      description
      image
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
  userReport {
    reports {
      id
      reason
      user_id
      report_user_id
      report_time
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
  articleReport {
    reports {
      id
      reason
      user_id
      article_id
      report_time
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

export default QueryArticles
