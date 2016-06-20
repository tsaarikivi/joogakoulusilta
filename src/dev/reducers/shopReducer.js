import { FETCH_SHOP_ITEMS, ADD_SHOP_ITEM, REMOVE_SHOP_ITEM } from '../actions/actionTypes.js'

export function shopItems(state = [], action) {
  switch (action.type) {
    case FETCH_SHOP_ITEMS:
      console.log("fetch items payload")
      console.log(action.payload);
      return [
        ...state
      ]
    default:
      return state
  }
}
