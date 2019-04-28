import React from 'react';
import { Route, Switch } from 'react-router-dom';

import routes from './routes'
import Loader from './Loader'

const GlobalRouter = function () {
  return (
    <Loader>
      <Switch>
        {routes.map((route, i) => (
          <Route key={i} path={route.path} exact={route.exact} render={props =>
            // pass the sub-routes down to keep nesting
            <route.component {...props} routes={route.routes} />
          } />
        ))}
      </Switch>
    </Loader>
  )
}

export default GlobalRouter
