import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import routes from './routes'

import { Nav, Footer, Page } from '@components'

const GlobalRouter = function () {
  return (
    <BrowserRouter>
      <Switch>
        {routes.map((route, i) => (
          <Route key={i} path={route.path} exact={route.exact} render={props =>
            // pass the sub-routes down to keep nesting
            <React.Fragment>>
              <Nav/>
              <Page>
                <route.component {...props} routes={route.routes} />
              </Page>
              <Footer/>
            </React.Fragment>
          } />
        ))}
      </Switch>
    </BrowserRouter>
  )
}

export default GlobalRouter
