import { Users } from '../states'

export default (state = {}, action) => {
  switch(action.type) {
    case Users.setUser:
      let users = {}
      action.users.forEach(item => {
        users[item.username] = item
      })
      return {
        ...state.users,
        ...users
      }
    default:
      return state
  }
}
