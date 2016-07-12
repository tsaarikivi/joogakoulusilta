import { PUT_COURSE_INFO, REMOVE_COURSE_INFO, FETCH_COURSE_BOOKINGS } from '../actions/actionTypes.js'

const INITIAL_STATE = null;

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_COURSE_BOOKINGS:
      console.log("FETCH_COURSE_BOOKINGS: ", action.payload, state);
      return Object.assign({},state,action.payload);
    break;
    case PUT_COURSE_INFO:
      console.log("PUT_COURSE_INFO", action.payload, state);
      return Object.assign({},state,action.payload);
    case REMOVE_COURSE_INFO:
      console.log("REMOVE_COURSE_INFO", state);
      return INITIAL_STATE

    default:
      return state;
  }
}
