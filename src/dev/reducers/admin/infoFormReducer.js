import { EXPAND_INFO_FORM, MINIMIZE_INFO_FORM } from '../../actions/actionTypes.js'

const INITIAL_STATE = {expanded: false}

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case EXPAND_INFO_FORM:
      return Object.assign({}, state, {expanded: true})
    case MINIMIZE_INFO_FORM:
      return Object.assign({}, state, {expanded: false})
    default:
      return state
  }
}