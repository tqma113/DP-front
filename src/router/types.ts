import { RouteProps } from 'react-router'

import Permission from './permission'

export interface IRoute extends RouteProps {
  auth: Permission,
  module: string,

  documentTitle?: string,
  routes?: IRoute[] | undefined
}