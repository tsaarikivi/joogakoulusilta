import { combineReducers } from 'redux'

import ShopReducer from './shopReducer.js'
import SpecialCourseReducer from './specialCoursesReducer.js'
import SpecialCoursesBannerReducer from './specialCoursesBannerReducer.js'
import TimetableReducer from './timetableReducer.js'
import AuthReducer from './authReducer.js'

const combinedReducer = combineReducers({
  shopItems: ShopReducer,
  specialCourses: SpecialCourseReducer,
  specialCoursesBanner: SpecialCoursesBannerReducer,
  timetable: TimetableReducer,
  auth: AuthReducer
})

export default combinedReducer;
