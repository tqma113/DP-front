import React, { useState } from 'react'
import { Query } from 'react-apollo'
import { message } from 'antd'

import getCookie from '@utils/getCookie'
import { QueryInitData } from '@graphql/querys'

import map from '@map'

const Loader = (props) => {
  const { children, handlers, store } = props
  const { session: { status }, loadStatus } = store

  const [categorys, setCategorys] = useState()

  let variables = {}

  let username = getCookie('username') || sessionStorage.getItem('username') || localStorage.getItem('username') || ''
  let token = getCookie('token') || sessionStorage.getItem('token') || localStorage.getItem('token') || ''

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

  const setLoginState = (data) => {
    const { isSuccess, sessionInfo, user } = data
    if (isSuccess && !status) {
      handleLoad(user, sessionInfo)
    }
  }

  const setCategorysData = (data) => {
    const { isSuccess, categorys } = data
    if (isSuccess) {
      setCategorys(categorys)
    }
  }

  const setInit = () => {
    handlers.init({ categorys, loadStatus })
  }

  return (
    <Query
      query={QueryInitData}
      variables={variables}
    >
      {({ loading, error, data = {}, refetch, networkStatus}) => {
        if (networkStatus === 4) return null;
        if (loading) return null;
        if (error) {
          message.error(error)
          return null;
        }

        const { checkLoginState, categorys } = data
        setLoginState(checkLoginState)

        setCategorysData(categorys)

        setInit()

        return loadStatus > 0 ? ({...children}) : null
      }}
    </Query>
  )
}

export default map(Loader, 'Loader')
