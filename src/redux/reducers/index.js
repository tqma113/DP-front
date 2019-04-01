import { combineReducers } from 'redux';

// import reducers
import login from './login'
import loading from './loading'

export default combineReducers({
  login,
  loading
})