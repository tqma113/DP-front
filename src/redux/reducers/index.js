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
import industrys from './industrys'
import messages from './messages'
import adminApplications from './adminApplications'
import categoryApplications from './categoryApplications'
import industryApplications from './industryApplications'
import admin from './admin'

export default combineReducers({
  users,
  session,
  loadStatus,
  messageStatus,
  categorys,
  floatStatus,
  documentTitle,
  articles,
  industrys,
  messages,
  adminApplications,
  categoryApplications,
  industryApplications,
  admin
})
