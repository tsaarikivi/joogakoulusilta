import { ADD_TO_CART_AND_CHECKOUT} from '../actions/actionTypes.js'

const INITIAL_STATE = []

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case ADD_TO_CART_AND_CHECKOUT:
      console.log("add to cart called: ", action.payload);
      console.log(state);
      return action.payload; //Currently only one item can be in the cart
    default:
      return state
  }
}
