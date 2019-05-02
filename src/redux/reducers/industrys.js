import { Industrys } from '../states'

export default (state = {}, action) => {
  switch(action.type) {
    case Industrys.setIndustrys:
      return action.industrys || []

    default:
      return state
  }
}
