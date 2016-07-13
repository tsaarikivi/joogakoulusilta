import { EXPAND_SPECIAL_COURSE_FORM, MINIMIZE_SPECIAL_COURSE_FORM } from '../../actions/actionTypes.js'

const INITIAL_STATE = false

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case EXPAND_SPECIAL_COURSE_FORM:
      return Object.assign({}, state, {expanded: true})
    case MINIMIZE_SPECIAL_COURSE_FORM:
      return Object.assign({}, state, {expanded: false})
    default:
      return state
  }
}