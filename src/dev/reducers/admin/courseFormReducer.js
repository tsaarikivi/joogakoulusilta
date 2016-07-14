import { EXPAND_COURSE_FORM, MINIMIZE_COURSE_FORM } from '../../actions/actionTypes.js'

const INITIAL_STATE = {expanded: false}

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case EXPAND_COURSE_FORM:
      return Object.assign({}, state, {expanded: true})
    case MINIMIZE_COURSE_FORM:
      return Object.assign({}, state, {expanded: false})
    default:
      return state
  }
}