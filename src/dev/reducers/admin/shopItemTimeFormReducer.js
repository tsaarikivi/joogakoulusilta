import { EXPAND_TIME_SHOP_FORM, MINIMIZE_TIME_SHOP_FORM } from '../../actions/actionTypes.js'

const INITIAL_STATE = false

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case EXPAND_TIME_SHOP_FORM:
      return true
    case MINIMIZE_TIME_SHOP_FORM:
      return false
    default:
      return state
  }
}