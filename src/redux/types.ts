import AllActionType from './constants'

export interface State {
  loadStatus: number
}

export interface Action {
  type: AllActionType
}