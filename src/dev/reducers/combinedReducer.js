import { combineReducers } from 'redux'
import { reducer as FormReducer } from 'redux-form'

import ShopReducer from './shopReducer.js'
import SpecialCourseReducer from './specialCoursesReducer.js'
import SpecialCoursesBannerReducer from './specialCoursesBannerReducer.js'
import TimetableReducer from './timetableReducer.js'
import CartReducer from './cartReducer.js'
import AuthReducer from './authReducer.js'
import UserReducer from './userReducer.js'
import PlaceInfoReducer from './placeInfoReducer.js'
import InstructorInfoReducer from './instructorInfoReducer.js'
import CourseInfoReducer from './courseInfoReducer.js'
import UserListReducer from './admin/userListReducer.js'
import AdminListReducer from './admin/adminListReducer.js'
import CourseListReducer from './admin/courseListReducer.js'
import InstructorListReducer from './admin/instructorListReducer.js'
import ShopListReducer from './admin/shopListReducer.js'

const combinedReducer = combineReducers({
  cart: CartReducer,
  currentUser: UserReducer,
  shopItems: ShopReducer,
  specialCourses: SpecialCourseReducer,
  specialCoursesBanner: SpecialCoursesBannerReducer,
  timetable: TimetableReducer,
  auth: AuthReducer,
  form: FormReducer,
  placeInfoData: PlaceInfoReducer,
  instructorInfo: InstructorInfoReducer,
  courseInfo: CourseInfoReducer,
  userList: UserListReducer,
  adminList: AdminListReducer,
  courseList: CourseListReducer,
  instructorList: InstructorListReducer,
  shopList: ShopListReducer
})

export default combinedReducer;
