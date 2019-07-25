import React from 'react'
import { Route, Switch } from 'react-router-dom'

import Permission from './permission'
import routes from './routes'
import Loader from './Loader'
import AuthComponent from './AuthComponent'

interface Props {

}

interface IRoute {
  path: string,
  component: (p: any) => React.ReactElement,
  exact: boolean,
  auth: Permission,
  module: string,

  documentTitle?: string,
  routes?: IRoute[]
}

const GlobalRouter: React.FC<Props> = (props) => {
  return (
    <Loader>
      <Switch>
        {routes.map(getRoute)}
      </Switch>
    </Loader>
  )
}

export default GlobalRouter

interface RouteProps {
  route: IRoute,
  i: number
}

const getRoute: (value: any, i: number) => React.ReactElement | null = (route, i) => {
  const RouteRender: React.FC<RouteProps> = ({route, i}) => {
    return (
      <Route key={i} path={route.path} exact={route.exact} render={props =>
        // pass the sub-routes down to keep nesting
        <AuthComponent
          documentTitle={route.documentTitle}
          component={route.component}
          auth={route.auth}
          module={route.module}
          {...props}
          routes={route.routes}
        />
      } />
    )
  }

  return RouteRender({ route, i })
}