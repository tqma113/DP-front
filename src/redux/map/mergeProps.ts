import staticState from '../static'
import { State } from '../types'

const mergeProps = (stateProps: {}, dispatchProps: {}) => {
  return {
    static: staticState,
    dispatch: dispatchProps,
    ...stateProps,
  }
}

export default mergeProps