import React from 'react'

import map from '@map'

const Loader = (props) => {
  const { data = {}, handlers = {}, history, store, children } = props
  const { checkLoginState = {}, loading } = data
  const { isSuccess = false, user = {}, sessionInfo = false } = checkLoginState
  const { session } = store
  const { status } = session
  const { location } = history
  const isLoginPage = location.pathname.indexOf('/login') !== -1

  if (!status) {
    if (isSuccess) {
      handlers.setSessionInfo({
        sessionInfo,
        user
      })

      if (isLoginPage) {
        handlers.goBack()
      }
    }
  }

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

export default map(Loader, 'Loader')
