// import actions
import actions from '../actions'
const {
  getSetUserAction,
  getClearUserAction
} = actions.user
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
      sessionStorage.setItem('token', token)
      sessionStorage.setItem('username', username)
    },
    logout: () => {
      localStorage.removeItem('token')
      localStorage.removeItem('username')
      sessionStorage.removeItem('token')
      sessionStorage.removeItem('username')
      dispatch(getClearSessionInfoAction())
      dispatch(getClearUserAction())
    },
    setSessionInfo: ({ sessionInfo, user }) => {
      dispatch(getSetSessionInfoAction(sessionInfo))
      dispatch(getSetUserAction(user))
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
    },
    goBack: () => {
    },
    go: (path) => {
      const { history } = ownProps
      history.push(path)
    }
  }
})

export default mapDispatchToProps
