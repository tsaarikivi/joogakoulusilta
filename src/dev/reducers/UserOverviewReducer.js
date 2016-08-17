import {
    ADD_USERS_TO_OVERVIEW,
    ADD_CREDITS_TO_OVERVIEW
} from '../actions/actionTypes.js'

const INITIAL_STATE = {
    userList: [],
    usersReady: false,
    credits: {}
}

export default function(state = INITIAL_STATE, action) {
    switch (action.type) {
        case ADD_USERS_TO_OVERVIEW:
            return Object.assign({}, state, action.payload)
        case ADD_CREDITS_TO_OVERVIEW:
            let newCredits = Object.assign(state.credits)
            newCredits[action.payload.user] = action.payload.credits
            return Object.assign({}, state, {credits: newCredits})
        default:
            return state
    }
}