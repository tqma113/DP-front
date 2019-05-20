import { AdminApplications } from '../states'

const getSetAdminApplicationsAction = (adminApplications) => {
  return {
    type: AdminApplications.setAdminApplications,
    adminApplications
  }
}

export {
  getSetAdminApplicationsAction
}
