import gql from 'graphql-tag'

const QueryIndustryApply = gql`
  query {
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
  }
`

export default QueryIndustryApply
