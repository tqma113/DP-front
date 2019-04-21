import { graphql } from 'react-apollo'
import { LoginMutation } from '@graphql/mutations'
import { QuerySessionState } from '@graphql/querys'

import getCookie from '@utils/getCookie'

export default {
  Login: [
    graphql(LoginMutation)
  ],
  Loader: [
    graphql(QuerySessionState, {
      options: ({  }) => {
        let username = getCookie('username') || sessionStorage.getItem('username')
        let token = getCookie('token') || sessionStorage.getItem('token')
        return {
          variables: {
            username,
            token
          }
        }
      }
    })
  ]
}
