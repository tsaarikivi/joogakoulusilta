import { FETCH_SHOP_ITEMS, ADD_SHOP_ITEM, REMOVE_SHOP_ITEM } from '../actions/actionTypes.js'

export function shopItems(state = {}, action) {
  switch (action.type) {
    case FETCH_SHOP_ITEMS:
      return Object.assign({},state.places, state.instructors, state.classes, action.payload);
    default:
      return state
  }
}
