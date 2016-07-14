import { FETCH_USER_LIST } from '../actions/actionTypes.js'

const INITIAL_STATE = []

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_USER_LIST:
      return action.payload
    default:
      return state
  }
}
