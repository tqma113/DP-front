// import actions
import actions from '../actions'
const {
  getSetSessionInfo
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
      const { history } = ownProps
      sessionStorage.setItem('token', token)
      sessionStorage.setItem('username', username)
      // history.goBack()
    },
    logout: () => {
      sessionStorage.clear()
    },
    setSessionInfo: ({ sessionInfo, user }) => {
      dispatch(getSetSessionInfo(sessionInfo, user))
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
