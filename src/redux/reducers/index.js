import { combineReducers } from 'redux';

// import reducers
import session from './session'
import loadStatus from './loadStatus'
import messageStatus from './messageStatus'

export default combineReducers({
  session,
  loadStatus,
  messageStatus
})
