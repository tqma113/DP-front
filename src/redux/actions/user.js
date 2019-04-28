import { User } from '../states'

const getSetUserAction = (user) => {
  return {
    type: User.setUser,
    user
  }
}

const getClearUserAction = () => {
  return {
    type: User.clearUser
  }
}


export {
  getSetUserAction,
  getClearUserAction
}
