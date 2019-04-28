import client from './client'

import { names } from './mutations'
import * as mutations from './mutations'

import {
  QuerySessionState
} from './querys'

import {

} from './subscriptions'

export const mutate = (mutationName, variables, options) => new Promise((resolve, reject) => {
  client.mutate({
    ...options,
    mutation: mutations[mutationName],
    variables
  })
  .then(res => {
    const { data } = res
    resolve(data)
  })
  .catch(err => {
    let networwErrorRes = {
      isSuccess: false,
      extension: {
        operator: 'network',
        errors: [{
          path: 'network',
          message: 'network fail'
        }]
      }
    }
    resolve(networwErrorRes)
  })
})
