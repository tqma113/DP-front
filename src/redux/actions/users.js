import { Users } from '../states'

const getSetUsersAction = (users) => {
  return {
    type: Users.setUsers,
    users
  }
}

export {
  getSetUsersAction
}
