import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'

import reducers from './reducers'
import initialState from './initialState'
import {} from './middleware'

const composeEnhancers = composeWithDevTools({
  // Specify name here, actionsBlacklist, actionsCreators and other options if needed

})

export default createStore(
  reducers,
  initialState,
  composeEnhancers(
    // add store enhancers if any
    applyMiddleware(),
    
  )
)