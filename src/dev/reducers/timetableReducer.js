import { FETCH_TIMETABLE } from '../actions/actionTypes.js'

const INITIAL_STATE = []

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_TIMETABLE:
      return action.payload
      break;
    default:
      return state
  }
}
