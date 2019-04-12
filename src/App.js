import React from 'react'
import { ApolloProvider } from 'react-apollo'
import { LocaleProvider } from 'antd'
import { Provider } from 'react-redux';
import zh_CN from 'antd/lib/locale-provider/zh_CN';

import client from './grapgql/client'
import store from '@redux';
// import './plugins/fontAwesome';

import Session from '@components/Session';

import './App.less';

const App = function() {
  return (
    <LocaleProvider locale={zh_CN}>
      <Provider store={store}>
        <ApolloProvider client={client}>
          <Session />
        </ApolloProvider>
      </Provider>
    </LocaleProvider>
  );
}

export default App;
