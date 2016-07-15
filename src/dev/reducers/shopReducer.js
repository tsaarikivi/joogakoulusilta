import {
  FETCH_SHOP_ITEMS ,
  ADD_TO_CART,
  GET_CLIENT_TOKEN,
  DO_PURCHASE_TRANSACTION,
  CHECKOUT_ERROR,
  CHECKOUT_TIMEOUT
} from '../actions/actionTypes.js'

const INITIAL_STATE = {cart:{}, error:{code: 0, message: "no error"}, items: [], token: "", purchaseResult:{}, phase: "start"}

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case CHECKOUT_TIMEOUT:
      console.log("CHECKOUT_TIMEOUT", action.payload);
      return Object.assign({},state,action.payload);
    case FETCH_SHOP_ITEMS:
      console.log("FETCH_SHOP_ITEMS", action.payload);
      return Object.assign({},state,action.payload);
    case ADD_TO_CART:
      console.log("ADD_TO_CART", action.payload);
      return Object.assign({},state,action.payload);
    case GET_CLIENT_TOKEN:
      console.log("GET_CLIENT_TOKEN", action.payload);
      return Object.assign({},state,action.payload);
    case DO_PURCHASE_TRANSACTION:
      console.log("DO_PURCHASE_TRANSACTION", action.payload);
      return Object.assign({},state,action.payload);
    case CHECKOUT_ERROR:
      console.log("CHECKOUT_ERROR", action.payload);
      return Object.assign({},state,action.payload, {phase: "error"});
    default:
      return state
  }
}
