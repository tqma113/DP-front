import { Messages } from '../states'

const getSetMessagesAction = (messages, username) => {
  return {
    type: Messages.setMessages,
    messages,
    username
  }
}

const getPushMessageAction = (message, username) => {
  return {
    type: Messages.pushMessage,
    message,
    username
  }
}

export {
  getSetMessagesAction,
  getPushMessageAction
}
