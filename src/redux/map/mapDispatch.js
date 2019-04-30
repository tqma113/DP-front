// import actions
import actions from '../actions'
const {
  getSetUsersAction,
} = actions.users
const {
  getSetSessionInfoAction,
  getClearSessionInfoAction
} = actions.session
const {
  getLoadingAction,
  getOnloadAction,
  getLoadLoginAction,
  getLoginLoadingAction
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
      const { history } = ownProps
      localStorage.removeItem('token')
      localStorage.removeItem('username')
      sessionStorage.removeItem('token')
      sessionStorage.removeItem('username')
      dispatch(getClearSessionInfoAction())
      history.push('/')
    },
    setSessionInfo: ({ sessionInfo, user }) => {
      dispatch(getSetSessionInfoAction(sessionInfo))
      dispatch(getSetUsersAction([user]))
    },
    setUsers: ({ users }) => {
      dispatch(getSetUsersAction(users))
    },
    turnToLogin: () => {
      dispatch(getLoadLoginAction())
    },
    turnToLoginLoading: () => {
      dispatch(getLoginLoadingAction())
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
      const { history = {} } = ownProps
      const { location = {} } = history
      const { search = '' } = location

      if (search) {
        let searchObj = {}
        search.slice(1).split('&').forEach(item => {
          let arr = item.split('=')
          searchObj[arr[0]] = arr[1]
        })
        if (searchObj.from) {
          history.push('/' + searchObj.from)
        } else {
          history.push('/')
        }
      } else {
        history.push('/')
      }
    },
    go: (path) => {
      const { history } = ownProps
      history.push(path)
    }
  }
})

export default mapDispatchToProps
