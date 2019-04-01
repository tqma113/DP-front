import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension'

import reducers from './reducers'
import initailState from './initailState'
import {} from './middleware'

const composeEnhancers = composeWithDevTools({
  // Specify name here, actionsBlacklist, actionsCreators and other options if needed
});

export default createStore(
  reducers, 
  initailState,
  composeEnhancers(
    applyMiddleware(),
    // other store enhancers if any
  )
)