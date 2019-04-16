import { LoadStatus } from '../states'

const getLoadingAction = () => {
  return {
    type: LoadStatus.reload
  }
}

const getOnloadAction = () => {
  return {
    type: LoadStatus.onload
  }
}

const getLoadLoginAction = () => {
  return {
    type: LoadStatus.login
  }
}


export {
  getLoadingAction,
  getOnloadAction,
  getLoadLoginAction
}
