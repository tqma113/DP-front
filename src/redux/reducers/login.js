import { Login } from '../states'

export default (state = {}, action) => {
  switch(action.type) {
    case Login.signIn:
      return {
        ...state,
        status: 1,
        sessionKey: action.sessionKey
      }
    case Login.setAccount:
      return {
        ...state,
        status: state.status > 0 ? state.status : 0,
        account: action.account,
        userInfo: action.userInfo
      }
    case Login.logOut:
      return {
        ...state,
        status: -1
      }
    case Login.updateSessionKey:
      return {
        ...state,
        sessionKey: action.sessionKey
      }
    default:
      return state
  }
}
