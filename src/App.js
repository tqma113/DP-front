import React from 'react'
import { ApolloProvider } from 'react-apollo'
import { LocaleProvider } from 'antd'
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import zh_CN from 'antd/lib/locale-provider/zh_CN';

import client from '@graphql/client'
import store from '@redux';
// import './plugins/fontAwesome';

import Router from '@router/index.jsx';
import { Controller } from '@containers'

import './App.less';

const App = function() {
  return (
    <Provider store={store}>
      <ApolloProvider client={client}>
        <LocaleProvider locale={zh_CN}>
          <BrowserRouter>
            <Controller>
              <Router />
            </Controller>
          </BrowserRouter>
        </LocaleProvider>
      </ApolloProvider>
    </Provider>
  );
}

export default App;
