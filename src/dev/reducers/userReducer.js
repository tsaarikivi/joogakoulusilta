import { USER_DETAILS_UPDATED_IN_DB, STOP_UPDATING_USER_DETAILS_FROM_DB } from '../actions/actionTypes.js'

const INITIAL_STATE = {key: "0"}

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case USER_DETAILS_UPDATED_IN_DB:
      console.log("USER_DETAILS_UPDATED_IN_DB: ", action.payload);
      return action.payload;
      break;
    case STOP_UPDATING_USER_DETAILS_FROM_DB:
      console.log("STOP_UPDATING_USER_DETAILS_FROM_DB - clearning current user");
      return INITIAL_STATE;
    default:
      return state;
  }
}
