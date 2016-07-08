import { UPDATE_USERS_TRANSACTIONS,USER_ERROR, USER_DETAILS_UPDATED_IN_DB, STOP_UPDATING_USER_DETAILS_FROM_DB } from '../actions/actionTypes.js'

const INITIAL_STATE = {key: "0", error: {code: 0, message: "ok"}}

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case UPDATE_USERS_TRANSACTIONS:
      console.log("UPDATE_USERS_TRANSACTIONS ", action.payload);
      return Object.assign([],state,action.payload);
      break;
    case USER_ERROR:
      console.log("USER_ERROR ", action.payload);
      return Object.assign([],state,action.payload);
      break;
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
