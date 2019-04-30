import AsyncComponent from './AsyncComponent'
import permissions from './permissions'

const Index = AsyncComponent(() => import('@containers/Index/index'))
const Login = AsyncComponent(() => import('@containers/Login'))
const Register = AsyncComponent(() => import('@containers/Register'))
const PasswordSetting = AsyncComponent(() => import('@containers/PasswordSetting'))
const PersonalCenter = AsyncComponent(() => import('@containers/PersonalCenter'))

const NoMatch = AsyncComponent(() => import('@containers/NoMatch'))

export default [
  {
    path: '/',
    component: Index,
    exact: true,
    auth: permissions.none
  },
  {
    path: '/login',
    component: Login,
    exact: true,
    auth: permissions.loginPage,
    module: 'Login'
  },
  {
    path: '/register',
    component: Register,
    exact: true,
    auth: permissions.none,
    module: 'Register'
  },
  {
    path: '/password_setting',
    component: PasswordSetting,
    exact: true,
    auth: permissions.isLogged,
    module: 'PasswordSetting'
  },
  {
    path: '/:username',
    component: PersonalCenter,
    auth: permissions.personalCenter,
    module: 'PersonalCenter'
  },
  {
    path: '/user/edit',
    component: PersonalCenter,
    auth: permissions.isLogged,
    module: ''
  },
  {
    path: null,
    component: NoMatch,
    auth: permissions.none
  }
]
