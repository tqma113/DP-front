import {Loading} from '../states'

export default (state = {}, action) => {
  switch(action.type) {
    case Loading.loadingDown:
      return {
        state: true
      }
    default:
      return state
  }
}