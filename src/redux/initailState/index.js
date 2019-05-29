import session from './session'

export default {
  // init store
  session,
  loadStatus: 0,
  floatStatus: 0,
  messageStatus: 1,

  documentTitle: 'Now',

  users: {},
  articles: {},
  messages: {},

  categorys: [],
  industrys: [],

  adminApplications: [],
  categoryApplications: [],
  industryApplications: [],

  admin: null
}
