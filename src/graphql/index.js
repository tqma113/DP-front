import client from './client'

import { names } from './mutations'
import * as mutations from './mutations'
import * as querys from './querys'

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
    console.error(err)
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

export const query = (queryName, variables, options) => new Promise((resolve, reject) => {
  client.query({
    ...options,
    query: querys[queryName],
    variables
  })
  .then(res => {
    const { data } = res
    resolve(data)
  })
  .catch(err => {
    console.error(err)
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
