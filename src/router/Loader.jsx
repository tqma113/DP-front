import React from 'react'
import { message } from 'antd'

import map from '@map'

const Loader = (props) => {
  const { data = {}, handlers = {}, store, error, children } = props
  const { checkLoginState = {} } = data
  const { isSuccess = false, user = {}, sessionInfo = false } = checkLoginState
  const { loadStatus } = store

  if (error) {
    message.error('无法拉取数据')
  }

  if (isSuccess && loadStatus === 0) {
    handlers.setSessionInfo({
      sessionInfo,
      user
    })
    handlers.onload()
  }

  if (!isSuccess) {
    handlers.onload()
  }

  if (loadStatus === 0) {
    return null
  }

  return (
    <React.Fragment>
      {{...children}}
    </React.Fragment>
  )

}

export default map(Loader, 'Loader')
