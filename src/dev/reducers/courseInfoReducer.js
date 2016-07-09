import { PUT_COURSE_INFO, REMOVE_COURSE_INFO } from '../actions/actionTypes.js'

const INITIAL_STATE = null

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {

    case PUT_COURSE_INFO:
      console.log("PUT_COURSE_INFO", action.payload);
      return action.payload

    case REMOVE_COURSE_INFO:
      console.log("REMOVE_COURSE_INFO");
      return INITIAL_STATE

    default:
      return state;
  }
}