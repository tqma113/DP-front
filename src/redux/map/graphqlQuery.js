import { graphql } from 'react-apollo'
import {
  LoginMutation,
  RegisterMutation,
  UploadImageMutation,
  SendEmailCodeMutation,
  AckEmailCodeMutation,
  CheckUsernameMutation
} from '@graphql/mutations'
import { QuerySessionState } from '@graphql/querys'

import getCookie from '@utils/getCookie'

export const querys = {
  Loader: [
    graphql(QuerySessionState, {
      options: () => {
        let username = getCookie('username') || localStorage.getItem('username')
        let token = getCookie('token') || localStorage.getItem('token')
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
  Login: {
    LoginMutation
  },
  Register: {
    RegisterMutation,
    SendEmailCodeMutation,
    AckEmailCodeMutation,
    CheckUsernameMutation
  },
  UploadImage: {
    UploadImageMutation
  }
}
