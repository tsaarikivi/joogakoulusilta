import { EXPAND_PLACE_FORM, MINIMIZE_PLACE_FORM } from '../../actions/actionTypes.js'

const INITIAL_STATE = false

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case EXPAND_PLACE_FORM:
      return Object.assign({}, state, {expanded: true})
    case MINIMIZE_PLACE_FORM:
      return Object.assign({}, state, {expanded: false})
    default:
      return state
  }
}
