import { combineReducers } from 'redux';

// import reducers
import users from './users'
import session from './session'
import loadStatus from './loadStatus'
import messageStatus from './messageStatus'

export default combineReducers({
  users,
  session,
  loadStatus,
  messageStatus
})
