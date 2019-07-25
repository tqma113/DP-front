import { State } from '../types'

export default (store: State, ownProps: {}) => {
  return {
    store,
    ...ownProps
  }
}