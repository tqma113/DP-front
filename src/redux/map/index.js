import { connect as connectNative } from 'react-redux'

import { withRouter as withRouteNative } from "react-router-dom";

import actions from '../actions'

const {
  getSignInAction,
  getLogOutAction,
  getUpdateSessionKeyAction,
  getSetAccountAction,
} = actions.login

const {
  getLoadingDown
} = actions.loading

// import actions


const mapStateToProps = (store, ownProps) => ({
  store,
  history: ownProps.history,
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  handlers: {
    signIn: (sessionKey) => {
      sessionStorage.setItem('sessionKey', sessionKey)
      dispatch(getSignInAction(sessionKey))
    },
    logOut: () => {
      sessionStorage.clear()
      dispatch(getLogOutAction())
    },
    updateSessionKey: (sessionKey) => {
      sessionStorage.setItem('sessionKey', sessionKey)
      dispatch(getUpdateSessionKeyAction(sessionKey))
    },
    setAccount: (account, userInfo) => {
      localStorage.setItem('last_user', account)
      sessionStorage.setItem('account', account)
      dispatch(getSetAccountAction(account, userInfo))
    },
    loadingDown: () => {
      dispatch(getLoadingDown())
    }
  }
})

export default (Component) => withRouteNative(connectNative(mapStateToProps, mapDispatchToProps)(Component))

export const connect = (Component) => connectNative(mapStateToProps, mapDispatchToProps)(Component)

export const withRouter = (Component) => withRouteNative(Component)
