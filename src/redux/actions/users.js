import { Users } from '../states'

const getSetUsersAction = (users) => {
  return {
    type: Users.setUser,
    users
  }
}

export {
  getSetUsersAction
}
