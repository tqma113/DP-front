import { CategoryApplications } from '../states'

export default (state = {}, action) => {
  switch(action.type) {
    case CategoryApplications.setCategoryApplications:
      return action.categorysApplications || []

    default:
      return state
  }
}
