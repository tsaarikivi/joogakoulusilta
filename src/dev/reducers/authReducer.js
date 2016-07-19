import {
    ADD_USER,
    REMOVE_USER,
    AUTH_ERROR,
    USER_DETAILS_UPDATED_IN_DB,
    AUTH_TIMEOUT
} from '../actions/actionTypes.js'

const INITIAL_STATE = {
    error: {
        code: 0,
        message: ""
    },
    timeout: false
}

export default function(state = INITIAL_STATE, action) {
    switch (action.type) {
        case ADD_USER:
            return Object.assign([], {
                error: {
                    code: 0,
                    message: ""
                }
            }, action.payload);
            break;
        case REMOVE_USER:
            return Object.assign([], INITIAL_STATE);
            break;
        case AUTH_ERROR:
            return Object.assign([], state, action.payload);
            break;
        case AUTH_TIMEOUT:
            return Object.assign([], state, action.payload);
            break;
        default:
            return state;
    }
}