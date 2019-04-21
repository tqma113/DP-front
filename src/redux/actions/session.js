import { Session } from '../states'

const getSetSessionInfoAction = (sessionInfo, user) => {
  return {
    type: Session.setSessionInfo,
    sessionInfo,
    user
  }
}

const getClearSessionInfoAction = () => {
  return {
    type: Session.clearSessionInfo
  }
}


export {
  getSetSessionInfoAction,
  getClearSessionInfoAction
}
