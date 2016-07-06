import { FETCH_SHOP_ITEMS , ADD_TO_CART_AND_CHECKOUT} from '../actions/actionTypes.js'

const INITIAL_STATE = []

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_SHOP_ITEMS:
      return action.payload
    default:
      return state
  }
}
