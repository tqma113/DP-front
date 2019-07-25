import React from 'react'

import Permission from './permission'

interface IRoute {
  path: string,
  component: (p: any) => React.ReactElement,
  exact: boolean,
  auth: Permission,
  module: string,

  documentTitle?: string,
  routes?: IRoute[] | undefined
}

interface Props {
  component: React.FC
  auth: Permission,
  module: string,

  documentTitle?: string,
  routes?: IRoute[] | undefined
}

interface State {

}

const AuthComponent: React.FC<Props> = (props: Props) => {

  return <props.component />
}

export default AuthComponent