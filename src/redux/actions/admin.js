import { Admin } from '../states'

const getSetAdminAction = (admin) => {
  return {
    type: Admin.setAdmin,
    admin
  }
}

export {
  getSetAdminAction
}
