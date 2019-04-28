import AsyncComponent from './AsyncComponent'

const Index = AsyncComponent(() => import('@containers/Index/index'), true)
const Login = AsyncComponent(() => import('@containers/Login'), true, 'Login')
const Register = AsyncComponent(() => import('@containers/Register'), true, 'Register')
const PasswordSetting = AsyncComponent(() => import('@containers/PasswordSetting'), true, 'PasswordSetting')
const PersonalCenter = AsyncComponent(() => import('@containers/PersonalCenter'), true, 'PersonalCenter')

const NoMatch = AsyncComponent(() => import('@containers/NoMatch'), true)

export default [
  {
    path: '/',
    component: Index,
    exact: true,
  },
  {
    path: '/login',
    component: Login,
    exact: true,
  },
  {
    path: '/register',
    component: Register,
    exact: true,
  },
  {
    path: '/password_setting',
    component: PasswordSetting,
    exact: true,
  },
  {
    path: '/:username',
    component: PersonalCenter,
  },
  {
    path: null,
    component: NoMatch
  }
]
