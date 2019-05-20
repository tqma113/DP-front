import { IndustryApplications } from '../states'

const getSetIndustryApplicationsAction = (industryApplications) => {
  return {
    type: IndustryApplications.setIndustryApplications,
    industryApplications
  }
}

export {
  getSetIndustryApplicationsAction
}
