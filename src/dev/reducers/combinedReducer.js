import { combineReducers } from 'redux'

import ShopReducer from './shopReducer.js'
import SpecialCourseReducer from './specialCourseReducer.js'

const combinedReducer = combineReducers({
  shopItems: ShopReducer,
  specialCourses: SpecialCourseReducer
})

export default combinedReducer;
