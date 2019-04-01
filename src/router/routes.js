import AsyncComponent from '@components/AsyncComponent'

const Index = AsyncComponent(() => import('@pages/Index/index'), true)
const Sign = AsyncComponent(() => import('@pages/Sign'), true)
const Register = AsyncComponent(() => import('@pages/Register'), true)

const NoMatch = AsyncComponent(() => import('@pages/NoMatch'), true)

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
