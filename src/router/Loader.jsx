import React, { useState } from 'react'
import { Query } from 'react-apollo'
import { message } from 'antd'

import getCookie from '@utils/getCookie'
import { QuerySessionState } from '@graphql/querys'

import map from '@map'

const Loader = (props) => {
  const { children, handlers, store } = props
  const { session: { status } } = store

  let variables = {}
  let skip = false

  let username = getCookie('username') || sessionStorage.getItem('username') || localStorage.getItem('username')
  let token = getCookie('token') || sessionStorage.getItem('token') || localStorage.getItem('token')
  if (!username || !token) {
    skip = true
  }

  variables = {
    username,
    token
  }

  const  handleLoad = (user, sessionInfo) => {
    handlers.setSessionInfo({
      sessionInfo,
      user
    })
  }

  return (
    <Query
      query={QuerySessionState}
      variables={variables}
      skip={skip}
    >
      {({ loading, error, data, refetch, networkStatus}) => {
        if (networkStatus === 4) return null;
        if (loading) return null;
        if (error) {
          message.error(error)
          return null;
        }

        const { checkLoginState } = data
        const { isSuccess, sessionInfo, user } = checkLoginState
        if (isSuccess && !status) {
          handleLoad(user, sessionInfo)
        }

        return (
          {...children}
        )
      }}
    </Query>
  )
}

export default map(Loader, 'Loader')
