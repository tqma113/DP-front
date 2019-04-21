import React, { Component } from 'react'

import map from '@map'

const Loader = (props) => {
  const { data = {}, handlers = {}, history, store, children } = props
  const { checkLoginState = {}, loading, error } = data
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
        const { search = '' } = location

        if (search) {
          let searchObj = {}
          search.slice(1).split('&').forEach(item => {
            let arr = item.split('=')
            searchObj[arr[0]] = arr[1]
          })
          if (searchObj.from) {
            history.push('/' + searchObj.from)
          } else {
            history.push('/')
          }
        } else {
          history.push('/')
        }
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
