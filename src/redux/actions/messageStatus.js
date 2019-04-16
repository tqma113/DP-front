import { messageStatus } from '../states'

const getOpenMessageAction = () => {
  return {
    type: messageStatus.open
  }
}

const getCloseMessageAction = () => {
  return {
    type: messageStatus.close
  }
}



export {
  getOpenMessageAction,
  getCloseMessageAction,
}
