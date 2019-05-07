import React, { useEffect, useState } from 'react'
import { Query } from 'react-apollo'
import { message } from 'antd'

import getCookie from '@utils/getCookie'
import { QueryInitData } from '@graphql/querys'

import map from '@map'

let username = getCookie('username') || sessionStorage.getItem('username') || localStorage.getItem('username') || ''
let token = getCookie('token') || sessionStorage.getItem('token') || localStorage.getItem('token') || ''

const Loader = (props) => {
  const { children, handlers, store } = props
  const { session: { status }, loadStatus } = store

  const initVariables = {
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
    const { isSuccess, user } = data
    if (isSuccess && !status) {
      handleLoad(user, {
        username,
        token
      })
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

  const setInit = ({ init = {}, categorys = {}, industrys = {} }) => {
    setLoginState(init)

    const ctg = getCategorysData(categorys)
    const idy = getIndustrysData(industrys)

    handlers.init({ categorys: ctg, loadStatus, industrys: idy })
  }

  const render = ({ loading, error, data = {}, refetch, networkStatus}) => {
    if (networkStatus === 4) return null;
    if (loading) return null;
    if (error) {
      message.error('数据初始化失败,请重试', error)
      return null;
    }
    const { init, categorys, industrys } = data


    setInit({ init, categorys, industrys })

    return loadStatus > 0 ? ({...children}) : null
  }

  return (
    <Query
      query={QueryInitData}
      variables={initVariables}
      children={render}
    />
  )
}

export default map(Loader, 'Loader')
