import { FETCH_SPECIAL_COURSES_BANNER } from '../actions/actionTypes.js'

const INITIAL_STATE = []

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_SPECIAL_COURSES_BANNER:
      return action.payload
    default:
      return state
  }
}
