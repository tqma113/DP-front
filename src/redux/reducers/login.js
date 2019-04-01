import {Login} from '../states'

export default (state = {}, action) => {
  switch(action.type) {
    case Login.signIn:
      return {
        ...state,
        state: true,
        sessionKey: action.sessionKey
      }
    case Login.logOut:
      return {
        state: false,
        userInfo: null,
        sessionKey: '',
        account: ''
      }
    case Login.updateSessionKey:
      return {
        ...state,
        sessionKey: action.sessionKey
      }
    case Login.setUserInfo:
      return {
        ...state,
        userInfo: action.userInfo
      }
    case Login.setAccount:
      return {
        ...state,
        account: action.account
      }
    default:
      return state
  }
}