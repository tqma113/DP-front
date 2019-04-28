import { User } from '../states'

export default (state = {}, action) => {
  switch(action.type) {
    case User.setUser:
      return {
        ...action.user
      }

    case User.clearUser:
      return {}

    default:
      return state
  }
}
