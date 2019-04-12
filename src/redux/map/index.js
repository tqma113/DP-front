import { connect as connectNative } from 'react-redux'

import { withRouter as withRouteNative } from "react-router-dom";

import actions from '../actions'

const {
  getLoginAction,
  getLogoutAction,
} = actions.session

// import actions


const mapStateToProps = (store, ownProps) => ({
  store,
  history: ownProps.history,
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  handlers: {
    login: ({ sessionInfo, user }) => {
      sessionStorage.setItem('token', sessionInfo.token)
      dispatch(getLoginAction(sessionInfo, user))
    },
    logout: () => {
      sessionStorage.clear()
      dispatch(getLogoutAction())
    }
  }
})

export default (Component) => withRouteNative(connectNative(mapStateToProps, mapDispatchToProps)(Component))

export const connect = (Component) => connectNative(mapStateToProps, mapDispatchToProps)(Component)

export const withRouter = (Component) => withRouteNative(Component)
