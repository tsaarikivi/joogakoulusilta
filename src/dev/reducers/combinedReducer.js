import { combineReducers } from 'redux'
import ShopReducer from './shopReducer.js'

const combinedReducer = combineReducers({
  shopItems: ShopReducer
})

export default combinedReducer;
