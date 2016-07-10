import { EXPAND_ADMIN_LIST, MINIMIZE_ADMIN_LIST } from '../actions/actionTypes.js'

const INITIAL_STATE = false

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case EXPAND_ADMIN_LIST:
      return true
    case MINIMIZE_ADMIN_LIST:
      return false
    default:
      return state
  }
}
