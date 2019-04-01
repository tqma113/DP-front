import AsyncComponent from '@components/AsyncComponent'

const Index = AsyncComponent(() => import('@pages/Index/index'), true)
const Sign = AsyncComponent(() => import('@pages/Sign'), true)
const Register = AsyncComponent(() => import('@pages/Register'), true)
const Recover = AsyncComponent(() => import('@pages/Recover'), true)

const Home = AsyncComponent(() => import('@pages/Home'), true)
const PersonEdit = AsyncComponent(() => import('@pages/PersonEdit'), true)
const ArticleCreate = AsyncComponent(() => import('@pages/ArticleCreate'), true)
const ProjectCreate = AsyncComponent(() => import('@pages/ProjectCreate'), true)
const PersonArticleList = AsyncComponent(() => import('@pages/PersonArticleList'), true)
const PersonProjectList = AsyncComponent(() => import('@pages/PersonProjectList'), true)

const Article = AsyncComponent(() => import('@pages/Article'), true)
const ArticleEdit = AsyncComponent(() => import('@pages/ArticleEdit'), true)

const ProjectEdit = AsyncComponent(() => import('@pages/ProjectEdit'), true)

const ArticleList = AsyncComponent(() => import('@pages/ArticleList'), true)
const ProjectList = AsyncComponent(() => import('@pages/ProjectList'), true)

const NoMatch = AsyncComponent(() => import('@pages/NoMatch'), true)

export default [
  {
    path: '/',
    component: Index,
    exact: true,
  },
  {
    path: '/sign',
    component: Sign,
  },
  {
    path: '/register',
    component: Register
  },
  {
    path: '/recover',
    component: Recover
  },
  {
    path: '/nomatch',
    component: NoMatch
  },
  {
    path: '/:id',
    component: Home,
    exact: true
  },
  {
    path: '/:id/edit',
    component: PersonEdit,
  },
  {
    path: '/:id/article/create',
    component: ArticleCreate,
  },{
    path: '/:id/project/create',
    component: ProjectCreate,
  },
  {
    path: '/:id/articles',
    component: PersonArticleList
  },
  {
    path: '/:id/projects',
    component: PersonProjectList
  },
  {
    path: '/article/:id',
    component: Article,
    exact: true
  },
  {
    path: '/article/:id/edit',
    component: ArticleEdit
  },
  {
    path: '/project/:id',
    component: '',
    exact: true
  },
  {
    path: '/project/:id/edit',
    component: ProjectEdit,
    session: true
  },
  {
    path: '/articles/:category',
    component: ArticleList,
  },
  {
    path: '/projects/:category',
    component: ProjectList,
  },
  {
    path: null,
    component: NoMatch
  }
]
