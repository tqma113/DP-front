import AsyncComponent from './AsyncComponent'
import permissions from './permissions'

const Index = AsyncComponent(() => import('@containers/Index/index'))
const Login = AsyncComponent(() => import('@containers/Login'))
const Register = AsyncComponent(() => import('@containers/Register'))
const PasswordSetting = AsyncComponent(() => import('@containers/PasswordSetting'))
const PersonalCenter = AsyncComponent(() => import('@containers/PersonalCenter'))
const Article = AsyncComponent(() => import('@containers/Article'))
const ArticleCreate = AsyncComponent(() => import('@containers/ArticleCreate'))
const ArticleEdit = AsyncComponent(() => import('@containers/ArticleEdit'))

const NoMatch = AsyncComponent(() => import('@containers/NoMatch'))

export default [
  {
    path: '/',
    component: Index,
    exact: true,
    auth: permissions.none,
    documentTitle: 'Now'
  },
  {
    path: '/login',
    component: Login,
    auth: permissions.loginPage,
    module: 'Login',
    documentTitle: 'Now'
  },
  {
    path: '/register',
    component: Register,
    exact: true,
    auth: permissions.none,
    module: 'Register',
    documentTitle: 'Now'
  },
  {
    path: '/password_setting',
    component: PasswordSetting,
    exact: true,
    auth: permissions.isLogged,
    module: 'PasswordSetting',
    documentTitle: 'Now'
  },
  {
    path: '/edit',
    component: PersonalCenter,
    exact: true,
    auth: permissions.isLogged,
    module: 'PersonalEdit',
    documentTitle: 'Now'
  },
  {
    path: '/article/create',
    component: ArticleCreate,
    exact: true,
    auth: permissions.isLogged,
    module: 'ArticleCreate',
    documentTitle: 'Now'
  },
  {
    path: '/article/edit/:id',
    component: ArticleEdit,
    exact: true,
    auth: permissions.isSelfArticle,
    module: 'ArticleEdit',
    documentTitle: 'Now'
  },
  {
    path: '/article/:id',
    component: Article,
    auth: permissions.none,
    module: 'Article',
    documentTitle: 'Now'
  },
  {
    path: '/:username',
    component: PersonalCenter,
    auth: permissions.personalCenter,
    module: 'PersonalCenter',
    documentTitle: 'Now'
  },
  {
    path: null,
    component: NoMatch,
    auth: permissions.none,
    documentTitle: 'Now - 404'
  }
]
