import { Articles } from '../states'

export default (state = {}, action) => {
  switch(action.type) {
    case Articles.setArticles:
      let articles = {}
      action.articles.forEach(item => {
        articles[item.id] = item
      })
      return {
        ...state.articles,
        ...articles
      }
    default:
      return state
  }
}
