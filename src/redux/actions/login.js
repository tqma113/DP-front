import {Login} from '../states'

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

export const getSetAccountAction = (account) => {
  return {
    type: Login.setAccount,
    account
  }
}

export const getUserInfoSetAction = (userInfo) => {
  return {
    type: Login.setUserInfo,
    userInfo
  }
}