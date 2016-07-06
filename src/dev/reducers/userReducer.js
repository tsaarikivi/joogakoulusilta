import { FETCH_USER_DETAILS } from '../actions/actionTypes.js'

const INITIAL_STATE = {}

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_USER_DETAILS:
      console.log("FETCH_USER_DETAILS: ", action.payload);
      return action.payload;
      break;
    default:
      return state;
  }
}
