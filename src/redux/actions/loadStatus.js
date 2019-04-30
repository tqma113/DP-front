import { LoadStatus } from '../states'

const getInitAction = () => {
  return {
    type: LoadStatus.init
  }
}

const getAuthAction = () => {
  return {
    type: LoadStatus.auth
  }
}

const getLoadAction = () => {
  return {
    type: LoadStatus.load
  }
}


export {
  getInitAction,
  getAuthAction,
  getLoadAction
}
