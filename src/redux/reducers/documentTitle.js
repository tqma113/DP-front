import { DocumentTitle } from '../states'

export default (state = {}, action) => {
  switch(action.type) {
    case DocumentTitle.setDocumentTitle:
      return action.documentTitle

    default:
      return state
  }
}
