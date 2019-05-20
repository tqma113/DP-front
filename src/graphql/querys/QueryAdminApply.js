import gql from 'graphql-tag'

const QueryAdminApply = gql`
  query {
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
  }
`

export default QueryAdminApply
