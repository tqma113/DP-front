import { floatStatus } from '../states'

const getFloatLoadingAction = () => {
  return {
    type: floatStatus.loading
  }
}

const getFloatOnloadAction = () => {
  return {
    type: floatStatus.onload
  }
}

const getFloatLoadLoginAction = () => {
  return {
    type: floatStatus.login
  }
}

const getFloatLoginLoadingAction = () => {
  return {
    type: floatStatus.loginLoading
  }
}


export {
  getFloatLoadingAction,
  getFloatOnloadAction,
  getFloatLoadLoginAction,
  getFloatLoginLoadingAction
}
