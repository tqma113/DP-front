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
  getInitAction,
  getAuthAction,
  getLoadAction
} = actions.loadStatus
const {
  getFloatLoadingAction,
  getFloatOnloadAction,
  getFloatLoadLoginAction,
  getFloatLoginLoadingAction
} = actions.floatStatus
const {
  getOpenMessageAction,
  getCloseMessageAction,
} = actions.messageStatus
const {
  getSetCategorysAction
} = actions.categorys

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
    setSessionInfo: ({ sessionInfo = {}, user = {} } = {}) => {
      dispatch(getSetSessionInfoAction(sessionInfo))
      dispatch(getSetUsersAction([user]))
    },
    setUsers: ({ users = [] } = {}) => {
      dispatch(getSetUsersAction(users))
    },
    setCategorys: ({ categorys = [] } = {}) => {
      dispatch(getSetCategorysAction(categorys))
    },
    init: ({ categorys = [], loadStatus = 0 } = {}) => {
      if (loadStatus === 0) {
        dispatch(getSetCategorysAction(categorys))
        dispatch(getInitAction())
      }
    },
    auth: ({ loadStatus = 0 } = {}) => {
      if (loadStatus === 1) {
        dispatch(getAuthAction())
      }
    },
    onload: ({ loadStatus = 0 } = {}) => {
      if (loadStatus === 2) {
        dispatch(getLoadAction())
        dispatch(getFloatOnloadAction())
      }
      if (loadStatus === 3) {
        dispatch(getFloatOnloadAction())
      }
    },
    reload: () => {
      dispatch(getFloatLoadingAction())
    },
    turnToLogin: () => {
      dispatch(getFloatLoadLoginAction())
    },
    turnToLoginLoading: () => {
      dispatch(getFloatLoginLoadingAction())
    },
    openMessage: () => {
      dispatch(getOpenMessageAction())
    },
    closeMessage: () => {
      dispatch(getCloseMessageAction())
    },
    goBack: () => {
      dispatch(getFloatLoadingAction())

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
          history.push(searchObj.from)
        } else {
          history.push('/')
        }
      } else {
        history.push('/')
      }
    },
    go: (path) => {
      dispatch(getFloatLoadingAction())

      const { history } = ownProps
      history.push(path)
    }
  }
})

export default mapDispatchToProps
