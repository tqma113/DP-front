import gql from 'graphql-tag'

const QueryCategoryApply = gql`
  query {
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
  }
`

export default QueryCategoryApply
