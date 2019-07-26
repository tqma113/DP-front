
import Permission from './permission'

import Home from '../containers/Home'

import { IRoute } from './types'

const routes: IRoute[] = [
  {
    path: '/',
    component: Home,
    exact: true,
    permission: Permission.none,

    module: 'Home',
    documentTitle: '首页 - Now'
  }
]

export default routes