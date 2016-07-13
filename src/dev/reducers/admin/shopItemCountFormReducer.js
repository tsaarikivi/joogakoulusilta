import { EXPAND_COUNT_SHOP_FORM, MINIMIZE_COUNT_SHOP_FORM } from '../../actions/actionTypes.js'

const INITIAL_STATE = false

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case EXPAND_COUNT_SHOP_FORM:
      return Object.assign({}, state, {expanded: true})
    case MINIMIZE_COUNT_SHOP_FORM:
      return Object.assign({}, state, {expanded: false})
    default:
      return state
  }
}