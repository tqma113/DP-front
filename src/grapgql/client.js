import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
// import { HttpLink } from 'apollo-link-http';
import { onError } from 'apollo-link-error';
// import { withClientState } from 'apollo-link-state';
// import { ApolloLink, Observable } from 'apollo-link';
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { getMainDefinition } from 'apollo-utilities';

import { WebSocketLink } from 'apollo-link-ws';
import { split } from 'apollo-link';

const isToken = localStorage.getItem('token') || '';

const wsLink = new WebSocketLink({
  uri: 'ws://localhost:4000/subscriptions',
  options: {
    reconnect: true,
    connectionParams: () => ({
      authToken: isToken,
    }),
  },
});

const cache = new InMemoryCache({
  cacheRedirects: {
    Query: {
      movie: (_, { id }, { getCacheKey }) =>
        getCacheKey({ __typename: 'Movie', id })
    }
  }
});

// const request = async (operation) => {
//   const token = await sessionStorage.getItem('token');
//   operation.setContext({
//     headers: {
//       authorization: token
//     }
//   });
// };

// const link = ApolloLink.from([
//   ,
//   requestLink,
//   withClientState({
//     defaults: {
//       isConnected: true
//     },
//     resolvers: {
//       Mutation: {
//         updateNetworkStatus: (_, { isConnected }, { cache }) => {
//           cache.writeData({ data: { isConnected }});
//           return null;
//         }
//       }
//     },
//     cache
//   }),
//   new HttpLink({
//     uri: 'http://localhost:4000/graphql',
//     credentials: 'include'
//   })
// ])

// const requestLink = new ApolloLink((operation, forward) =>
//   new Observable(observer => {
//     let handle;
//     Promise.resolve(operation)
//       .then(oper => request(oper))
//       .then(() => {
//         handle = forward(operation).subscribe({
//           next: observer.next.bind(observer),
//           error: observer.error.bind(observer),
//           complete: observer.complete.bind(observer),
//         });
//       })
//       .catch(observer.error.bind(observer));

//     return () => {
//       if (handle) handle.unsubscribe();
//     };
//   })
// );


const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      ...headers,
      Authorization: `Bearer ${token}` || null,
    },
  };
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    // sendToLoggingService(graphQLErrors);
  }
  if (networkError) {
    // logoutUser();
  }
})

const httpLink = createHttpLink({
  uri: 'http://localhost:4000/graphql'
})

const link = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return kind === 'OperationDefinition' && operation === 'subscription';
  },
  wsLink,
  authLink.concat(errorLink.concat(httpLink))
)

const client = new ApolloClient({
  link,
  cache,
  ssrMode: true,
  connectToDevTools: true,
  name: 'Web',
  version: '1.0',
  defaultOptions: {
    // watchQuery: {
    //   fetchPolicy: 'cache-and-network',
    //   errorPolicy: 'ignore',
    // },
    // query: {
    //   fetchPolicy: 'network-only',
    //   errorPolicy: 'all',
    // },
    // mutate: {
    //   errorPolicy: 'all'
    // }
  }
});

export default client