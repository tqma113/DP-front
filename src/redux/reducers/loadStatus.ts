import { AnyAction, Reducer } from 'redux'
import { LOADSTATUS } from '../constants'

interface Action extends AnyAction {
  type: LOADSTATUS
}

const reducer: Reducer<number, Action> = (state: number | undefined, action: Action) => {
  if (state === undefined ||[0, 1, 2, 3].indexOf(state) === -1) {
    return 0
  }

  switch(action.type) {
    case LOADSTATUS.INIT:
      return 1
    case LOADSTATUS.AUTH:
      return 2
    case LOADSTATUS.LOAD:
      return 3
    default:
      return state
  }
}

export default reducer