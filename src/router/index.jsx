import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Loader from './Loader'
import AuthComponent from './AuthComponent'

import routes from './routes'

const GlobalRouter = function () {
  return (
    <Loader>
      <Switch>
        {routes.map((route, i) => (
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
        ))}
      </Switch>
    </Loader>
  )
}

export default GlobalRouter
