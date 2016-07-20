import {
    UPDATE_USERS_BOOKINGS,
    UPDATE_USERS_TRANSACTIONS,
    USER_ERROR,
    USER_DETAILS_UPDATED_IN_DB,
    STOP_UPDATING_USER_DETAILS_FROM_DB
} from '../actions/actionTypes.js'

const INITIAL_STATE = {
    key: "0",
    error: {
        code: "0",
        message: "ok"
    },
    bookings: [],
    history: [],
    roles: {
        admin: false,
        instructor: false
    },
    transactions: {
        details: {
            expired: [],
            valid: []
        }
    }
}

export default function(state = INITIAL_STATE, action) {
    switch (action.type) {
        case UPDATE_USERS_BOOKINGS:
            return Object.assign({}, state, action.payload);
            break;
        case UPDATE_USERS_TRANSACTIONS:
            return Object.assign({}, state, action.payload);
            break;
        case USER_ERROR:
            console.error("USER_ERROR: ", action.payload)
            return Object.assign({}, state, action.payload);
            break;
        case USER_DETAILS_UPDATED_IN_DB:
            return Object.assign({}, state, action.payload);;
            break;
        case STOP_UPDATING_USER_DETAILS_FROM_DB:
            return INITIAL_STATE;
        default:
            return state;
    }
}