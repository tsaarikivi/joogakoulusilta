import { FETCH_SHOP_ITEMS } from '../actions/actionTypes.js'

const INITIAL_STATE = []

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_SHOP_ITEMS:
      return action.payload
    default:
      return state
  }
}
