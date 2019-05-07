import { Session } from '../states'

export default (state = {}, action) => {
  switch(action.type) {
    case Session.setSessionInfo:
      let isValid = action.sessionInfo;
      if (isValid) {
        return {
          ...state,
          status: true,
          info: action.sessionInfo || {}
        }
      }

      throw new Error('login fail. data structment is illeagel')

    case Session.clearSessionInfo:
      return {
        ...state,
        status: false,
        info: {}
      }
    default:
      return state
  }
}
