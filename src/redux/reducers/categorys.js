import { Categorys } from '../states'

export default (state = {}, action) => {
  switch(action.type) {
    case Categorys.setCategorys:
      return action.categorys || []

    default:
      return state
  }
}
