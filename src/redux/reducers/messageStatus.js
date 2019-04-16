import { messageStatus } from '../states'

export default (state = {}, action) => {
  switch(action.type) {
    case messageStatus.close:
      return 0
    case messageStatus.open:
      return 1
    default:
      return state
  }
}
