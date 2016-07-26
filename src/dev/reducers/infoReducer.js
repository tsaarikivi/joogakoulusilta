import {
    STOP_FETCH_INFO_LIST,
    FETCH_INFO_LIST,
    EXPAND_INFO_LIST,
    MINIMIZE_INFO_LIST
} from '../actions/actionTypes.js'

const INITIAL_STATE = {
    expanded: false,
    list: []
}

export default function(state = INITIAL_STATE, action) {
    switch (action.type) {
        case STOP_FETCH_INFO_LIST:
            return Object.assign({}, state, action.payload)
        case FETCH_INFO_LIST:
            return Object.assign({}, state, action.payload)
        case EXPAND_INFO_LIST:
            return Object.assign({}, state, {
                expanded: true
            })
        case MINIMIZE_INFO_LIST:
            return Object.assign({}, state, {
                expanded: false
            })
        default:
            return state
    }
}