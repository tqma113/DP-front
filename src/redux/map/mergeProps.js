import { mutate } from '@graphql'
import { mutations } from './graphqlQuery'
import staticState from './static'

const getMergeProps = (module) => (stateProps, dispatchProps, ownProps) => {
  return {
    mutations: mutations[module],
    mutate,
    static: staticState,
    ...stateProps,
    ...dispatchProps,
    ...ownProps
  }
}

export default getMergeProps
