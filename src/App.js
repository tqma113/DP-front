import React, { Component } from 'react';
import { ApolloProvider, Query } from 'react-apollo'

import client from './grapgql/client'

import './App.css';

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div></div>
      </ApolloProvider>
    );
  }
}

export default App;
