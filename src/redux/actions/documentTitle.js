import { DocumentTitle } from '../states'

const getSetDocumentTitleAction = (documentTitle) => {
  return {
    type: DocumentTitle.setDocumentTitle,
    documentTitle
  }
}

export {
  getSetDocumentTitleAction
}
