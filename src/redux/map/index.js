import { connect as connectNative } from 'react-redux'
import { withRouter as withRouteNative } from "react-router-dom";
import { compose as composeNative } from 'react-apollo'

import mapStateToProps from './mapState'
import mapDispatchToProps from './mapDispatch'
import getMergeProps from './mergeProps'

export default (Component, module) => withRouteNative(connectNative(mapStateToProps, mapDispatchToProps, getMergeProps(module))(Component))

export const connect = (Component, module) => connectNative(mapStateToProps, mapDispatchToProps, getMergeProps(module))(Component)

export const withRouter = (Component) => withRouteNative(Component)
