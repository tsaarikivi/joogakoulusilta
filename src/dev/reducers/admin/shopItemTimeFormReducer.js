import { EXPAND_TIME_SHOP_FORM, MINIMIZE_TIME_SHOP_FORM } from '../../actions/actionTypes.js'

const INITIAL_STATE = {expanded: false}

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case EXPAND_TIME_SHOP_FORM:
      return Object.assign({}, state, {expanded: true})
    case MINIMIZE_TIME_SHOP_FORM:
      return Object.assign({}, state, {expanded: false})
    default:
      return state
  }
}