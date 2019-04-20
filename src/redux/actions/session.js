import { Session } from '../states'

const getSetSessionInfo =(sessionInfo, user) => {
  return {
    type: Session.setSessionInfo,
    sessionInfo,
    user
  }
}


export {
  getSetSessionInfo,
}
