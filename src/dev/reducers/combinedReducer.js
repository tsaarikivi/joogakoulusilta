import {
    combineReducers
} from 'redux'
import {
    reducer as FormReducer
} from 'redux-form'

import ShopReducer from './shopReducer.js'
import SpecialCourseReducer from './specialCoursesReducer.js'
import SpecialCoursesBannerReducer from './specialCoursesBannerReducer.js'
import TimetableReducer from './timetableReducer.js'
import AuthReducer from './authReducer.js'
import UserReducer from './userReducer.js'
import InfoReducer from './infoReducer.js'
import CourseInfoReducer from './courseInfoReducer.js'
import SpecialCourseInfoReducer from './specialCourseInfoReducer.js'
import UserListReducer from './admin/userListReducer.js'
import AdminListReducer from './admin/adminListReducer.js'
import CourseListReducer from './admin/courseListReducer.js'
import InstructorListReducer from './admin/instructorListReducer.js'
import ShopListReducer from './admin/shopListReducer.js'
import PlaceFormReducer from './admin/placeFormReducer.js'
import CourseTypeFormReducer from './admin/courseTypeFormReducer.js'
import CourseFormReducer from './admin/courseFormReducer.js'
import SpecialCourseFormReducer from './admin/specialCourseFormReducer.js'
import ShopItemTimeFormReducer from './admin/shopItemTimeFormReducer.js'
import ShopItemCountFormReducer from './admin/shopItemCountFormReducer.js'
import CourseTypeListReducer from './admin/courseTypeListReducer.js'
import PlaceListReducer from './admin/placeListReducer.js'
import InfoFormReducer from './admin/infoFormReducer.js'

const combinedReducer = combineReducers({
    currentUser: UserReducer,
    shopItems: ShopReducer,
    specialCourses: SpecialCourseReducer,
    specialCoursesBanner: SpecialCoursesBannerReducer,
    timetable: TimetableReducer,
    auth: AuthReducer,
    form: FormReducer,
    courseInfo: CourseInfoReducer,
    specialCourseInfo: SpecialCourseInfoReducer,
    userList: UserListReducer,
    adminList: AdminListReducer,
    courseList: CourseListReducer,
    instructorList: InstructorListReducer,
    shopList: ShopListReducer,
    placeForm: PlaceFormReducer,
    courseTypeForm: CourseTypeFormReducer,
    courseForm: CourseFormReducer,
    specialCourseFrom: SpecialCourseFormReducer,
    shopItemTimeForm: ShopItemTimeFormReducer,
    shopItemCountForm: ShopItemCountFormReducer,
    courseTypeList: CourseTypeListReducer,
    placeList: PlaceListReducer,
    infoList: InfoReducer,
    infoForm: InfoFormReducer
})

export default combinedReducer;