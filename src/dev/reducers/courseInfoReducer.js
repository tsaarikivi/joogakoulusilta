import { PUT_COURSE_INFO, REMOVE_COURSE_INFO, FETCH_COURSE_BOOKINGS } from '../actions/actionTypes.js'

const INITIAL_STATE = null;

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_COURSE_BOOKINGS:
      return Object.assign({},state,action.payload);
    case PUT_COURSE_INFO:
      return Object.assign({},state,action.payload);
    case REMOVE_COURSE_INFO:
      return INITIAL_STATE
    default:
      return state;
  }
}
