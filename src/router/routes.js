import AsyncComponent from './AsyncComponent'
import permissions from './permissions'

const Index = AsyncComponent(() => import('@containers/Index/index'))
const Login = AsyncComponent(() => import('@containers/Login'))
const Register = AsyncComponent(() => import('@containers/Register'))
const PasswordSetting = AsyncComponent(() => import('@containers/PasswordSetting'))
const Home = AsyncComponent(() => import('@containers/Home'))
const Article = AsyncComponent(() => import('@containers/Article'))
const ArticleCreate = AsyncComponent(() => import('@containers/ArticleCreate'))
const ArticleEdit = AsyncComponent(() => import('@containers/ArticleEdit'))
const Apply = AsyncComponent(() => import('@containers/Apply'))
const Admin = AsyncComponent(() => import('@containers/Admin'))

const NoMatch = AsyncComponent(() => import('@containers/NoMatch'))

export default [
  {
    path: '/notmatch',
    component: NoMatch,
    auth: permissions.none,
    documentTitle: '404 - Now'
  },
  {
    path: '/',
    component: Index,
    exact: true,
    auth: permissions.none,
    module: 'Index',
    documentTitle: '首页 - Now'
  },
  {
    path: '/login',
    component: Login,
    auth: permissions.loginPage,
    module: 'Login',
    documentTitle: '登录 - Now'
  },
  {
    path: '/register',
    component: Register,
    exact: true,
    auth: permissions.none,
    module: 'Register',
    documentTitle: '注册 - Now'
  },
  {
    path: '/password_setting',
    component: PasswordSetting,
    exact: true,
    auth: permissions.none,
    module: 'PasswordSetting',
    documentTitle: '设置密码 - Now'
  },
  {
    path: '/article/create',
    component: ArticleCreate,
    exact: true,
    auth: permissions.isLogged,
    module: 'ArticleCreate',
    documentTitle: '写文章 - Now'
  },
  {
    path: '/article/edit/:id',
    component: ArticleEdit,
    exact: true,
    auth: permissions.editArticle,
    module: 'ArticleEdit',
    documentTitle: '编辑文章 - Now'
  },
  {
    path: '/apply',
    component: Apply,
    exact: true,
    auth: permissions.isLogged,
    module: 'Apply',
    documentTitle: '申请 - Now'
  },
  {
    path: '/admin',
    component: Admin,
    exact: true,
    auth: permissions.isLogged,
    module: 'Admin',
    documentTitle: '管理员 - Now'
  },
  {
    path: '/article/:id',
    component: Article,
    auth: permissions.article,
    module: 'Article',
    documentTitle: ' - Now'
  },
  {
    path: '/:username',
    component: Home,
    auth: permissions.home,
    module: 'Home',
    documentTitle: ' - Now'
  }
]
