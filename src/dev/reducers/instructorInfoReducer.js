import { FETCH_INSTRUCTOR_INFO } from '../actions/actionTypes.js'

const INITIAL_STATE = []

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_INSTRUCTOR_INFO:
      return action.payload
    default:
      return state
  }
}
