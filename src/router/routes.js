import AsyncComponent from './AsyncComponent'

const Index = AsyncComponent(() => import('@containers/Index/index'), true)
const Sign = AsyncComponent(() => import('@containers/Sign'), true)
const Register = AsyncComponent(() => import('@containers/Register'), true)

const NoMatch = AsyncComponent(() => import('@containers/NoMatch'), true)

export default [
  {
    path: '/',
    component: Index,
    exact: true,
  },
  {
    path: '/login',
    component: Sign,
  },
  {
    path: '/register',
    component: Register
  },
  {
    path: null,
    component: NoMatch
  }
]
