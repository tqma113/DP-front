import { LoadStatus } from '../states'

export default (state = {}, action) => {
  switch(action.type) {
    case LoadStatus.reload:
      return 0
    case LoadStatus.onload:
      return 1
    case LoadStatus.login:
      return 2
    default:
      return state
  }
}
