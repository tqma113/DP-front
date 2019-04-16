import { Session } from '../states'

const getLoginAction =(sessionInfo, user) => {
  return {
    type: Session.setAccount,
    sessionInfo,
    user
  }
}

const getLogoutAction = () => {
  return {
    type: Session.logout
  }
}


export {
  getLoginAction,
  getLogoutAction
}
