import { FETCH_PLACE_INFO } from '../actions/actionTypes.js'

const INITIAL_STATE = []

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_PLACE_INFO:
      return action.payload
    default:
      return state
  }
}
