import { combineReducers } from 'redux';

// import reducers
import users from './users'
import session from './session'
import loadStatus from './loadStatus'
import messageStatus from './messageStatus'
import categorys from './categorys'
import floatStatus from './floatStatus'
import documentTitle from './documentTitle'
import articles from './articles'

export default combineReducers({
  users,
  session,
  loadStatus,
  messageStatus,
  categorys,
  floatStatus,
  documentTitle,
  articles
})
