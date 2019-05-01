import { Articles } from '../states'

const getSetArticlesAction = (articles) => {
  return {
    type: Articles.setArticles,
    articles
  }
}

export {
  getSetArticlesAction
}
