import { graphql } from 'react-apollo'
import { QuerySessionState } from '@graphql/querys'

import getCookie from '@utils/getCookie'

export const querys = {
  Loader: [
    graphql(QuerySessionState, {
      options: () => {
        let username = getCookie('username') || sessionStorage.getItem('username') || localStorage.getItem('username')
        let token = getCookie('token') || sessionStorage.getItem('token') || localStorage.getItem('token')
        return {
          variables: {
            username,
            token
          }
        }
      }
    })
  ],
}

export const mutations = {
  UploadImage: {
    UploadImageMutation: 'UploadImageMutation'
  },
  Auth: {
    checkUsernameValidMutation: 'checkUsernameValidMutation'
  },
  Login: {
    LoginMutation: 'LoginMutation',
    LoginWithEmailMutation: 'LoginWithEmailMutation',
    SendEmailLoginCodeMutation: 'SendEmailLoginCodeMutation',
  },
  Register: {
    RegisterMutation: 'RegisterMutation',
    SendEmailCodeMutation: 'SendEmailCodeMutation',
    AckEmailCodeMutation: 'AckEmailCodeMutation',
    CheckUsernameMutation: 'CheckUsernameMutation'
  },
  PasswordSetting: {
    SendEmailLoginCodeMutation: 'SendEmailLoginCodeMutation',
    AckEmailCodeMutation: 'AckEmailCodeMutation',
    SetPassowordMutation: 'SetPassowordMutation'
  },
}
