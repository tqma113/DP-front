import {Login} from '../states'

export const getSetAccountAction = (account, userInfo) => {
  return {
    type: Login.setAccount,
    account,
    userInfo
  }
}

export const getSignInAction = (sessionKey) => {
  return {
    type: Login.signIn,
    sessionKey
  }
}

export const getLogOutAction = () => {
  return {
    type: Login.logOut
  }
}

export const getUpdateSessionKeyAction = (sessionKey) => {
  return {
    type: Login.updateSessionKey,
    sessionKey
  }
}
