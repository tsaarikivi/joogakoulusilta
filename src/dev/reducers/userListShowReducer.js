import { EXPAND_USER_LIST, MINIMIZE_USER_LIST } from '../actions/actionTypes.js'

const INITIAL_STATE = false

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case EXPAND_USER_LIST:
      return true
    case MINIMIZE_USER_LIST:
      return false
    default:
      return state
  }
}
