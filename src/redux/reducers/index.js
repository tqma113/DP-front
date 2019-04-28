import { combineReducers } from 'redux';

// import reducers
import user from './user'
import session from './session'
import loadStatus from './loadStatus'
import messageStatus from './messageStatus'

export default combineReducers({
  user,
  session,
  loadStatus,
  messageStatus
})
