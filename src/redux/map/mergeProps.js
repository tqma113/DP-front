import { mutate } from '@graphql'
import { mutations } from './graphqlQuery'

const getMergeProps = (module) => (stateProps, dispatchProps, ownProps) => {
  return {
    mutations: mutations[module],
    mutate,
    ...stateProps,
    ...dispatchProps,
    ...ownProps
  }
}

export default getMergeProps
