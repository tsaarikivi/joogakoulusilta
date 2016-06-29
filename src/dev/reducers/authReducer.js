import { ADD_USER, REMOVE_USER } from '../actions/actionTypes.js'

const INITIAL_STATE = null

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
    default:
      return state;
  }
}
