import Permission from './permission'

import Home from '../containers/Home'

interface IRoute {
  path: string,
  component: React.ComponentClass,
  exact: boolean,
  auth: Permission,
  module: string,

  documentTitle?: string,
  routes?: IRoute[] | undefined
}

const routes: IRoute[] = [
  {
    path: '/',
    component: Home,
    exact: true,
    auth: Permission.none,

    module: 'Home',
    documentTitle: '首页 - Now'
  }
]

export default routes