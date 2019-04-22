import { connect as connectNative } from 'react-redux'
import { withRouter as withRouteNative } from "react-router-dom";
import { compose as composeNative } from 'react-apollo'

import mapStateToProps from './mapState'

import mapDispatchToProps from './mapDispatch'

import graphqlQuery from './graphqlQuery'

export default (Component, module) =>  (module && graphqlQuery[module]) ?
                                      composeNative(...graphqlQuery[module])(withRouteNative(connectNative(mapStateToProps, mapDispatchToProps)(Component))) :
                                      withRouteNative(connectNative(mapStateToProps, mapDispatchToProps)(Component))

export const connect = (Component) => connectNative(mapStateToProps, mapDispatchToProps)(Component)

export const withRouter = (Component) => withRouteNative(Component)

export const compose = (Component, module) => (module && graphqlQuery[module]) ?
                                            composeNative(...graphqlQuery[module])(Component) :
                                            Component
