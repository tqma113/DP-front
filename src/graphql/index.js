import { message } from 'antd'
import client from './client'

import { names } from './mutations'
import * as mutations from './mutations'

import {
  QuerySessionState
} from './querys'

import {

} from './subscriptions'

export const mutate = (mutationName, variables, options) => new Promise((resolve, reject) => {
  try {
    const res = client.mutate({
      ...options,
      mutation: mutations[mutationName],
      variables
    })
    const { data } = res
    resolve(data)
  } catch (err) {
    reject(err)
    message.error('请求发送失败,请重试')
  }
})
