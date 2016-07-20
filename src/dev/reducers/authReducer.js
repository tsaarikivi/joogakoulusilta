import {
    ADD_USER,
    REMOVE_USER,
    AUTH_ERROR,
    USER_DETAILS_UPDATED_IN_DB,
    AUTH_TIMEOUT,
    EMAIL_UPDATED,
    PASSWORD_UPDATED
} from '../actions/actionTypes.js'

const INITIAL_STATE = {
    error: {
        code: "0",
        message: ""
    },
    timeout: false,
    emailUpdated: false,
    passwordUpdated: false
}

export default function(state = INITIAL_STATE, action) {
    switch (action.type) {
        case ADD_USER:
            console.log("ADD_USER", state, action)
            return Object.assign({}, {
                error: {
                    code: "0",
                    message: ""
                }
            }, action.payload);
        case REMOVE_USER:
            console.log("REMOVE_USER", state)
            return Object.assign({}, INITIAL_STATE);
        case AUTH_ERROR:
            console.log("AUTH_ERROR", state)
            return Object.assign({}, state, action.payload);
        case AUTH_TIMEOUT:
            console.log("AUTH_TIMEOUT", state)
            return Object.assign({}, state, action.payload);
        case EMAIL_UPDATED:
            console.log("EMAIL_UPDATED")
            return Object.assign({}, state, action.payload);
        case PASSWORD_UPDATED:
            console.log("PASSWORD_UPDATED")
            return Object.assign({}, state, action.payload);
        default:
            return state;
    }
}