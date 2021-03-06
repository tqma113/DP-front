// import actions
import actions from '../actions'
const {
  getSetUsersAction,
} = actions.users
const {
  getSetArticlesAction
} = actions.articles
const {
  getSetSessionInfoAction,
  getClearSessionInfoAction,
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
const {
  getSetIndustrysAction
} = actions.industrys
const {
  getSetDocumentTitleAction
} = actions.documentTitle
const {
  getSetMessagesAction,
  getPushMessageAction
} = actions.messages
const {
  getSetAdminApplicationsAction
} = actions.adminApplications
const {
  getSetCategoryApplicationsAction
} = actions.categoryApplications
const {
  getSetIndustryApplicationsAction
} = actions.industryApplications
const {
  getSetAdminAction
} = actions.admin

const mapDispatchToProps = (dispatch, ownProps) => ({
  handlers: {
    login: ({ token, username }) => {
      localStorage.setItem('token', token)
      localStorage.setItem('username', username)
      sessionStorage.setItem('token', token)
      sessionStorage.setItem('username', username)
      dispatch(getSetSessionInfoAction({ token, username }))
      // history.go(0)
    },
    logout: () => {
      // const { history } = ownProps
      localStorage.removeItem('token')
      localStorage.removeItem('username')
      sessionStorage.removeItem('token')
      sessionStorage.removeItem('username')
      dispatch(getClearSessionInfoAction())
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
    setIndustrys: ({ industrys = [] } = {}) => {
      dispatch(getSetIndustrysAction(industrys))
    },
    setArticles: ({ articles = [] } = {}) => {
      dispatch(getSetArticlesAction(articles))
    },
    setMessages: ({ messages = [], username = '' }) => {
      dispatch(getSetMessagesAction(messages, username))
    },
    setAdminApplications: ({ adminApplications = [] }) => {
      dispatch(getSetAdminApplicationsAction(adminApplications))
    },
    setCategoryApplications: ({ categoryApplications = [] }) => {
      dispatch(getSetCategoryApplicationsAction(categoryApplications))
    },
    setIndustryApplications: ({ industryApplications = [] }) => {
      dispatch(getSetIndustryApplicationsAction(industryApplications))
    },
    setAdmin: ({ admin = {} }) => {
      dispatch(getSetAdminAction(admin))
    },
    pushMessage: ({ message = {}, username = ''}) => {
      dispatch(getPushMessageAction(message, username))
    },
    setDocumentTitle: ({ documentTitle = '' }) => {
      dispatch(getSetDocumentTitleAction(documentTitle))
    },
    init: ({ categorys = [], loadStatus = 0, industrys = [] } = {}) => {
      if (loadStatus === 0) {
        dispatch(getSetCategorysAction(categorys))
        dispatch(getSetIndustrysAction(industrys))
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
      const { history = {} } = ownProps
      const { location = {} } = history
      const { search = '', pathname = '' } = location

      if (search) {
        let searchObj = {}
        search.slice(1).split('&').forEach(item => {
          let arr = item.split('=')
          searchObj[arr[0]] = arr[1]
        })
        if (searchObj.from) {
          if (pathname === searchObj.from) return

          dispatch(getFloatLoadingAction())
          history.push(searchObj.from)
        } else {
          dispatch(getFloatLoadingAction())
          history.push('/')
        }
      } else {
        dispatch(getFloatLoadingAction())
        history.push('/')
      }
    },
    go: (path) => {
      const { history = {} } = ownProps
      const { location = {} } = history
      const { pathname } = location

      if (path === pathname) return

      dispatch(getFloatLoadingAction())
      history.push(path)
    }
  }
})

export default mapDispatchToProps
