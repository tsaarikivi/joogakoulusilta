import { historyTypes as types } from '../actions/actionTypes.js'

const INITIAL_STATE = null

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case types.FETCH_HISTORY:
            return Object.assign({}, state, action.payload);
        default:
            return state;
    }
}