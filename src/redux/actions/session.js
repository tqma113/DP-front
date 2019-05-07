import { Session } from '../states'

const getSetSessionInfoAction = (sessionInfo) => {
  return {
    type: Session.setSessionInfo,
    sessionInfo
  }
}

const getClearSessionInfoAction = () => {
  return {
    type: Session.clearSessionInfo
  }
}

export {
  getSetSessionInfoAction,
  getClearSessionInfoAction,
}
