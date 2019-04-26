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
    const a = data[names[mutationName]]
    const { isSuccess = false, extension = {}, ...others } = a
    if (isSuccess) {
      resolve(others)
    } else {
      const { errors = [] } = extension
      const { message = '' } = errors[0]
      message.error(message)
      reject(message)
    }
  } catch (err) {
    message.error('请求发送失败,请重试')
  }
})
