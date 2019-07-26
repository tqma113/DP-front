import React from 'react'
import { Route, Switch } from 'react-router-dom'

import routes from './routes'
import Loader from './Loader'
import AuthComponent from './AuthComponent'

import { IRoute } from './types'

interface Props {

}

const GlobalRouter: React.FC<Props> = (props: React.ComponentProps<typeof GlobalRouter>) => {
  return (
    <Loader>
      <Switch>
        {routes.map(getRoute)}
      </Switch>
    </Loader>
  )
}

export default GlobalRouter

interface MapRouteProps {
  route: IRoute,
  i: number
}

const getRoute: (value: any, i: number) => React.ReactElement | null = (route, i) =>  RouteRender({ route, i })

const RouteRender: React.FC<MapRouteProps> = ({route, i}) => {
  return (
    <Route key={i} path={route.path} exact={route.exact} render={props =>
      // pass the sub-routes down to keep nesting
      <AuthComponent
        component={route.component}
        permission={route.permission}
        module={route.module}
        {...props}
        routes={route.routes}
      />
    } />
  )
}