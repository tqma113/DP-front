import { Session } from '../states'

export default (state = {}, action) => {
  switch(action.type) {
    case Session.setSessionInfo:
      let isValid = action.sessionInfo && action.user;
      if (isValid) {
        return {
          ...state,
          status: true,
          info: action.sessionInfo || {},
          user: { [action.user.username ]:action.user } || {}
        }
      }

      throw new Error('login fail. data structment is illeagel')

    case Session.clearSessionInfo:
      return {
        ...state,
        status: false,
        info: {},
        user: {}
      }

    default:
      return state
  }
}
