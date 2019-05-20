import { IndustryApplications } from '../states'

export default (state = {}, action) => {
  switch(action.type) {
    case IndustryApplications.setIndustryApplications:
      return action.industryApplications || []

    default:
      return state
  }
}
