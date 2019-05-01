import React, { useEffect, useState } from 'react'
import { Redirect } from 'react-router-dom'

import permissions from './permissions'

import { connect } from '@map'

const AuthComponent = (props) => {
  const {
    store = {},
    match = {},
    component = null,
    mutations = {},
    mutate,
    auth = '',
    handlers = {},
    location = {},
    module = '',
    documentTitle = ''
  } = props
  const { session, loadStatus } = store
  const { status = false, info = {} } = session
  const { username: currentUsername } = info
  const { pathname = '' } = location
  const { params = {} } = match
  const { username } = params

  const [authStatus, setAuthStatus] = useState(false)
  const [subProps, setSubProps] = useState({ module })

  useEffect(() => {
      document.title = documentTitle
      handlers.setDocumentTitle({ documentTitle })
  }, [])

  useEffect(() => {
    if (!authStatus) {
      checkPermission()
    } else {
      handlers.auth({ loadStatus })
    }
  })

  const checkPermission = async () => {
    switch (auth) {
      case permissions.isLogged:
        if (!status) {
          handlers.go('/login?from=' + pathname)
        }
        setAuthStatus(true)
      break;
      case permissions.loginPage:
        if (status) {
          handlers.goBack()
        }
        setAuthStatus(true)
      break;
      case permissions.personalCenter:
        const data = await mutate(
          mutations.checkUsernameValidMutation,
          {
            username
          }
        )
        const { checkUsernameValid } = data
        const { isSuccess = false } = checkUsernameValid

        if (!isSuccess) {
          handlers.go('/notmatch')
        }

        let isSelf = username === currentUsername

        setSubProps({...subProps, isSelf, username })
        setAuthStatus(true)
      break;
      case permissions.none:
        setAuthStatus(true)
      break;
      default:
        return <Redirect to='notmacth' />
    }
  }

  const C = component

  return (
    authStatus ? <C {...subProps} /> : null
  )
}

export default connect(AuthComponent, 'Auth')
