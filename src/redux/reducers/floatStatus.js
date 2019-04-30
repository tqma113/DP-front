import { floatStatus } from '../states'

export default (state = {}, action) => {
  switch(action.type) {
    case floatStatus.loading:
      return 0
    case floatStatus.onload:
      return 1
    case floatStatus.login:
      return 2
    case floatStatus.loginLoading:
      return 3
    default:
      return state
  }
}
