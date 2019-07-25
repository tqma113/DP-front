import React from 'react'
import { connect as connectNative } from 'react-redux'
import { withRouter } from "react-router-dom";
import { compose as composeNative } from 'react-apollo'

import mapStateToProps from './mapState'
import mapDispatchToProps from './mapDispatch'
import mergeProps from './mergeProps'

export const connect: (Component: React.ComponentClass | React.FC) => React.ComponentClass | React.FC = (Component: React.ComponentClass | React.FC) => connectNative(mapStateToProps, mapDispatchToProps, mergeProps)(Component)

export default (Component: React.ComponentClass | React.FC) => withRouter<any, React.ComponentType>(connect(Component))