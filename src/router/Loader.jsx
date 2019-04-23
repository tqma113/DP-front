import React from 'react'
import { message } from 'antd'

import map from '@map'

class Loader extends React.Component {
  componentDidUpdate() {
    const { data = {}, handlers = {}, history, store, error } = this.props
    const { checkLoginState = {} } = data
    const { isSuccess = false, user = {}, sessionInfo = false } = checkLoginState
    const { session } = store
    const { status } = session
    const { location } = history
    const isLoginPage = location.pathname.indexOf('/login') !== -1

    if (error) {
      message.error('无法拉取数据')
    }

    if (!status) {
      if (isSuccess) {
        handlers.setSessionInfo({
          sessionInfo,
          user
        })

        if (isLoginPage) {
          handlers.goBack()
        }
      } else {
        localStorage.clear()
      }
    }
  }

  render() {
    const { children, history = {}, data = {}, store = {} } = this.props
    const { loading } = data
    const { location } = history
    const { session } = store
    const { status } = session
    const isLoginPage = location.pathname.indexOf('/login') !== -1
    if (loading) {
      return null
    }

    if (isLoginPage && status) {
      return null
    }

    return (
      <React.Fragment>
        {{...children}}
      </React.Fragment>
    )

  }
}

export default map(Loader, 'Loader')
