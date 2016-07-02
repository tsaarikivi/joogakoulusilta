import { combineReducers } from 'redux'

import ShopReducer from './shopReducer.js'
import SpecialCourseReducer from './specialCoursesReducer.js'
import SpecialCoursesBannerReducer from './specialCoursesBannerReducer.js'
import TimetableReducer from './timetableReducer.js'
import CartReducer from './cartReducer.js'
import AuthReducer from './authReducer.js'
import UserReducer from './userReducer.js'
import { reducer as FormReducer } from 'redux-form'

const combinedReducer = combineReducers({
  cart: CartReducer,
  currentUser: UserReducer,
  shopItems: ShopReducer,
  specialCourses: SpecialCourseReducer,
  specialCoursesBanner: SpecialCoursesBannerReducer,
  timetable: TimetableReducer,
  auth: AuthReducer,
  form: FormReducer
})

export default combinedReducer;
