import { Messages } from '../states'

export default (state = {}, action) => {
  switch(action.type) {
    case Messages.setMessages:
      return {
        ...state,
        [action.username]: action.messages
      }
    case Messages.pushMessage:
      let messages = state[action.username] || []
      messages.push(action.message)
      return {
        [action.username]: messages,
        ...state
      }
    default:
      return state
  }
}
