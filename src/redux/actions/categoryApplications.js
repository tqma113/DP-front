import { CategoryApplications } from '../states'

const getSetCategoryApplicationsAction = (categoryApplications) => {
  return {
    type: CategoryApplications.setCategoryApplications,
    categoryApplications
  }
}

export {
  getSetCategoryApplicationsAction
}
