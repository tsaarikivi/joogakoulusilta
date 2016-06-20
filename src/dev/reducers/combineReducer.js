import { combineReducers } from 'redux'
import { shopItems } from './shopReducer.js'

import seedData from "../../seed.js"
console.log(seedData);

const combineReducer = combineReducers({
  shopItems
})
