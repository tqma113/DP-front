import { Admin } from '../states'

export default (state = {}, action) => {
  switch(action.type) {
    case Admin.setAdmin:
      return action.admin
    default:
      return state
  }
}
