import {
    CHANGE_LOADINGSCREEN_STATE
} from '../actions/actionTypes.js'

const INITIAL_STATE = {
    visible: false,
    context: ""
}

export default function(state = INITIAL_STATE, action) {

    switch (action.type) {
        case CHANGE_LOADINGSCREEN_STATE:
            return Object.assign({}, state, action.payload);
        default:
            return state;
    }
}