import { ADD_USER, REMOVE_USER, AUTH_ERROR } from '../actions/actionTypes.js'

const INITIAL_STATE = []

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case ADD_USER:
      console.log("ADD_USER");
      return action.payload;
      break;
    case REMOVE_USER:
      console.log("REMOVE_USER");
      return INITIAL_STATE;
      break;
    case AUTH_ERROR:
      console.log("AUTH_ERROR: ", action.payload);
      return action.payload;
      break;
    default:
      return state;
  }
}
