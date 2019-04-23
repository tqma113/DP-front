// import actions
import actions from '../actions'
const {
  getSetSessionInfoAction,
  getClearSessionInfoAction
} = actions.session
const {
  getLoadingAction,
  getOnloadAction,
  getLoadLoginAction
} = actions.loadStatus
const {
  getOpenMessageAction,
  getCloseMessageAction,
} = actions.messageStatus

const mapDispatchToProps = (dispatch, ownProps) => ({
  handlers: {
    login: ({ token, username }) => {
      localStorage.setItem('token', token)
      localStorage.setItem('username', username)
    },
    logout: () => {
      localStorage.clear()
      dispatch(getClearSessionInfoAction())
    },
    setSessionInfo: ({ sessionInfo, user }) => {
      dispatch(getSetSessionInfoAction(sessionInfo, user))
    },
    turnToLogin: () => {
      dispatch(getLoadLoginAction())
    },
    onload: () => {
      dispatch(getOnloadAction())
    },
    reload: () => {
      dispatch(getLoadingAction())
    },
    openMessage: () => {
      dispatch(getOpenMessageAction())
    },
    closeMessage: () => {
      dispatch(getCloseMessageAction())
    }
  }
})

export default mapDispatchToProps
