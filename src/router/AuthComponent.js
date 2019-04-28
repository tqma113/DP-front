import React, { useEffect, useState } from 'react'
import { Redirect } from 'react-router-dom'

import permissions from './permissions'

import { connect } from '@map'

const AuthComponent = (props) => {
  const { store = {}, match = {}, component = null, mutations = {}, mutate, auth = '', history = {}, handlers = {}, location = {}, module = '' } = props
  const { session } = store
  const { status = false, info = {} } = session
  const { username: currentUsername } = info
  const { pathname = '' } = location
  const { params = {} } = match
  const { username } = params

  const [authStatus, setAuthStatus] = useState(false)
  const [subProps, setSubProps] = useState({ module })

  useEffect(() => {
    if (!authStatus && status) {
      checkPermission()
      setAuthStatus(true)
    }
  }, [status])

  const checkPermission = async () => {
    switch (auth) {
      case permissions.isLogged:
        if (!status) {
          return < Redirect to="/login" from={pathname} />
        }
      break;
      case permissions.loginPage:
        if (status) {
          handlers.goBack()
        }
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
          return <Redirect to='notmacth' />
        }

        setSubProps({...subProps, isSelf: username === currentUsername})
      break;
      case permissions.none:
      break;
      default:
        return <Redirect to='notmacth' />
    }
  }

  const ConnectComponent = connect(component, module)

  return (
    authStatus ? <ConnectComponent {...subProps} /> : null
    // <div></div>
  )
}

export default connect(AuthComponent, 'Auth')
