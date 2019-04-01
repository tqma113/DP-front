import React, { Component } from 'react'
import { ApolloProvider, Query } from 'react-apollo'
import { LocaleProvider } from 'antd'
import { Provider } from 'react-redux';
import zh_CN from 'antd/lib/locale-provider/zh_CN';

import client from './grapgql/client'
import store from '@redux';
// import './plugins/fontAwesome';

import Session from '@components/Session';

import './App.css';

class App extends Component {
  render() {
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
}

export default App;
