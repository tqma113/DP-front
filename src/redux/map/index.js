import { connect } from 'react-redux'

import api from '@api'

import {withRouter} from "react-router-dom";

import CommonStyle from '@style/common.css'

import actions from '../actions'

const {
  getSignInAction,
  getLogOutAction,
  getUpdateSessionKeyAction,
  getSetAccountAction,
  getUserInfoSetAction
} = actions.login

const {
  getLoadingDown
} = actions.loading

// import actions


const mapStateToProps = (store, ownProps) => ({
  store,
  get: api.get,
  post: api.post,
  put: api.put,
  delete: api.delete,
  history: ownProps.history,
  CommonStyle
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
    setAccount: (account) => {
      localStorage.setItem('last_user', account)
      sessionStorage.setItem('account', account)
      dispatch(getSetAccountAction(account))
    },
    setUserInfo: (userInfo) => {
      dispatch(getUserInfoSetAction(userInfo))
    },
    loadingDown: () => {
      dispatch(getLoadingDown())
    }
  }
})

export default (Component) => withRouter(connect(mapStateToProps, mapDispatchToProps)(Component))