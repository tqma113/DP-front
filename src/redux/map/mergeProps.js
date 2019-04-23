import client from '@graphql/client'
import { mutations } from './graphqlQuery'

const getMergeProps = (module) => (stateProps, dispatchProps, ownProps) => {
  return {
    mutations: mutations[module],
    client,
    ...stateProps,
    ...dispatchProps,
    ...ownProps
  }
}

export default getMergeProps
