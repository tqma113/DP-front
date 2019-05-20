import { AdminApplications } from '../states'

export default (state = {}, action) => {
  switch(action.type) {
    case AdminApplications.setAdminApplications:
      return action.adminApplications || []

    default:
      return state
  }
}
