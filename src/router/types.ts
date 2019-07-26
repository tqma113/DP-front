import { RouteProps } from 'react-router'

import Permission from './permission'

export interface IRoute extends RouteProps {
  permission: Permission,
  module: string,

  documentTitle?: string,
  routes?: IRoute[] | undefined
  render?: any
}