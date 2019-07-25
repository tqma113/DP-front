import React from 'react'

import Permission from './permission'
import { IRoute } from './types'
interface Props extends IRoute {
}

interface State {

}

const AuthComponent: React.FC<Props> = (props: React.ComponentProps<typeof AuthComponent>) => {
  let C = props.component

  if (typeof C === 'undefined') {
    return null;
  }
  return <C />
}

export default AuthComponent