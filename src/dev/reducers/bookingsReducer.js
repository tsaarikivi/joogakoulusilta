import { FETCH_BOOKINGS, CLEAR_BOOKINGS } from '../actions/actionTypes.js'

const INITIAL_STATE = {}

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case CLEAR_BOOKINGS:
      console.log("CLEAR_BOOKINGS");
      return INITIAL_STATE;
    break;
    case FETCH_BOOKINGS:
      console.log("FETCH_BOOKINGS: ", action.payload);
      return Object.assign({},state,action.payload);
    break;
    default:
      return INITIAL_STATE;
  }
}
