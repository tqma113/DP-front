import React, { useState } from 'react'
import { Query } from 'react-apollo'
import { message } from 'antd'

import getCookie from '@utils/getCookie'
import { QueryInitData } from '@graphql/querys'

import map from '@map'

const Loader = (props) => {
  const { children, handlers, store } = props
  const { session: { status }, loadStatus } = store

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

  const getCategorysData = (data) => {
    const { isSuccess, categorys } = data

    if (isSuccess) {
      return categorys
    } else {
      return []
    }
  }

  const getIndustrysData = (data) => {
    const { isSuccess, industrys } = data

    if (isSuccess) {
      return industrys
    } else {
      return []
    }
  }

  const setInit = ({ checkLoginState, categorys, industrys }) => {
    setLoginState(checkLoginState)

    const ctg = getCategorysData(categorys)
    const idy = getIndustrysData(industrys)

    handlers.init({ categorys: ctg, loadStatus, industrys: idy })
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

        const { checkLoginState, categorys, industrys } = data

        setInit({ checkLoginState, categorys, industrys })

        return loadStatus > 0 ? ({...children}) : null
      }}
    </Query>
  )
}

export default map(Loader, 'Loader')
