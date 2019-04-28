import React, { useState } from 'react'
import { message } from 'antd'

import map from '@map'

const Loader = (props) => {
  const { data = {}, handlers = {}, error, children } = props
  const { checkLoginState = {} } = data
  const { isSuccess = false, user = {}, sessionInfo = false } = checkLoginState

  const [loadStatus, setLoadStatus] = useState(false)

  if (error) {
    message.error('无法拉取数据')
  }

  if (isSuccess && !loadStatus) {
    handlers.setSessionInfo({
      sessionInfo,
      user
    })
    setLoadStatus(true)
  }

  return (
    <React.Fragment>
      {loadStatus && {...children}}
    </React.Fragment>
  )
}

export default map(Loader, 'Loader')
