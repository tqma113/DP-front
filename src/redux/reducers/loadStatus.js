import { LoadStatus } from '../states'

export default (state = {}, action) => {
  switch(action.type) {
    case LoadStatus.init:
      return 1
    case LoadStatus.auth:
      return 2
    case LoadStatus.load:
      return 3
    default:
      return state
  }
}
