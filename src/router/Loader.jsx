import React, { useState } from 'react'
import { Query, Subscription } from 'react-apollo'
import { message } from 'antd'

import getCookie from '@utils/getCookie'
import { QueryInitData } from '@graphql/querys'
import { NewMessageSubScription } from '@graphql/subscriptions'

import map from '@map'

let username = getCookie('username') || sessionStorage.getItem('username') || localStorage.getItem('username') || ''
let token = getCookie('token') || sessionStorage.getItem('token') || localStorage.getItem('token') || ''

const Loader = (props) => {
  const { children, handlers, store } = props
  const { session: { status }, loadStatus, users = {} } = store
  const currentUser = users[username]

  const initVariables = {
    username,
    token
  }
  const newMessageVariables = {
    userId: currentUser ? Number(currentUser.id) : NaN
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

  console.log('loader', status, currentUser)

  return (
    <React.Fragment>
      <Query
        query={QueryInitData}
        variables={initVariables}
      >
        {({ loading, error, data = {}, refetch, networkStatus}) => {
          if (networkStatus === 4) return null;
          if (loading) return null;
          if (error) {
            message.error(error)
            return null;
          }

          const { init, categorys, industrys } = data

          setInit({ init, categorys, industrys })

          return loadStatus > 0 ? ({...children}) : null
        }}
      </Query>
      {status && currentUser &&
        <React.Fragment>
          <Subscription
            subscription={NewMessageSubScription}
            variables={newMessageVariables}
          >
            {({ data: { newMessage } = {}, loading }) => {
              console.log(newMessage)
              return null
            }}
          </Subscription>
        </React.Fragment>
      }
    </React.Fragment>
  )
}

export default map(Loader, 'Loader')
