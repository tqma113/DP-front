import React from 'react'
import { RouteComponentProps } from 'react-router'
import { IRoute } from './types'

interface Props extends RouteComponentProps {
}

interface State {

}

const AuthComponent = (props: Props & IRoute) => {
  let C = props.component
  if (typeof C === 'undefined') {
    return null;
  }
  return <C {...props} />
}

export default AuthComponent