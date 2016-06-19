import { combineReducers } from 'redux'
import { ADD_SHOP_ITEM, REMOVE_SHOP_ITEM } from '../actions/actionTypes.js'

function shopItems(state = [], action) {
  switch (action.type) {
    case ADD_SHOP_ITEM:
      return [
        ...state,
        {
          title: action.title,
          desc: action.desc,
          price: action.price,
        }
      ]
      break;
    case REMOVE_SHOP_ITEM:
      return state
    default:
      return state
  }
}

const shopReducer = combineReducers({
  shopItems
})

export default shopReducer
