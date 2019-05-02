import { mutate, query } from '@graphql'
import { mutations, querys } from './graphqlQuery'
import staticState from './static'

const getMergeProps = (module) => (stateProps, dispatchProps, ownProps) => {
  return {
    mutations: mutations[module],
    mutate,
    query,
    querys: querys[module],
    static: staticState,
    ...stateProps,
    ...dispatchProps,
    ...ownProps
  }
}

export default getMergeProps
