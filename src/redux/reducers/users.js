import { Users } from '../states'

export default (state = {}, action) => {
  switch(action.type) {
    case Users.setUsers:
      let users = {}
      action.users.forEach(item => {
        users[item.username] = item
      })
      return {
        ...state,
        ...users
      }
    default:
      return state
  }
}
