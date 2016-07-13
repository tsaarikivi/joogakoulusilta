import { 
  FETCH_USER_LIST,
  FETCH_ADMIN_LIST,
  FETCH_COURSE_LIST,
  FETCH_INSTRUCTOR_LIST,
  FETCH_SHOP_LIST,

  EXPAND_ADMIN_LIST,
  MINIMIZE_ADMIN_LIST,
  EXPAND_USER_LIST,
  MINIMIZE_USER_LIST,
  EXPAND_COURSE_LIST,
  MINIMIZE_COURSE_LIST,
  EXPAND_INSTRUCTOR_LIST,
  MINIMIZE_INSTRUCTOR_LIST,
  EXPAND_SHOP_LIST,
  MINIMIZE_SHOP_LIST,
  
  EXPAND_PLACE_FORM,
  MINIMIZE_PLACE_FORM,
  EXPAND_COURSE_TYPE_FORM,
  MINIMIZE_COURSE_TYPE_FORM,
  EXPAND_COURSE_FORM,
  MINIMIZE_COURSE_FORM,
  EXPAND_SPECIAL_COURSE_FORM,
  MINIMIZE_SPECIAL_COURSE_FORM,
  EXPAND_TIME_SHOP_FORM,
  MINIMIZE_TIME_SHOP_FORM,
  EXPAND_COUNT_SHOP_FORM,
  MINIMIZE_COUNT_SHOP_FORM
} from './actionTypes.js'

const UsersRef = firebase.database().ref('/users/')

export function fetchUserList() {
  var list = []
  return dispatch => {
    UsersRef.once('value', snapshot => {
      var users = snapshot.val()
      for (var key in users) {
        if (users.hasOwnProperty(key) && !users[key].admin) {
          let ItemWithKey = users[key]
          ItemWithKey.key = key
          list = list.concat(ItemWithKey)
        }
      }
      dispatch({
        type: FETCH_USER_LIST,
        payload: list
      })
    })
  }
}

export function fetchAdminList() {
  var list = []
  return dispatch => {
    UsersRef.once('value', snapshot => {
      var users = snapshot.val()
      for (var key in users) {
        if (users.hasOwnProperty(key) && users[key].admin) {
          let ItemWithKey = users[key]
          ItemWithKey.key = key
          list = list.concat(ItemWithKey)
        }
      }
      dispatch({
        type: FETCH_ADMIN_LIST,
        payload: list
      })
    })
  }
}

export function fetchCourseList() {
  var list = []
  return dispatch => {
    firebase.database().ref('/courses/').once('value', snapshot => {
      var courses = snapshot.val()
      for (var key in courses) {
        if (courses.hasOwnProperty(key)) {
          let ItemWithKey = courses[key]
          ItemWithKey.key = key
          list = list.concat(ItemWithKey)
        }
      }
      dispatch({
        type: FETCH_COURSE_LIST,
        payload: list
      })
    })
  }
}

export function fetchInstructorList() {
  var list = []
  return dispatch => {
    UsersRef.once('value', snapshot => {
      var users = snapshot.val()
      for (var key in users) {
        if (users.hasOwnProperty(key) && users[key].instructor) {
          let ItemWithKey = users[key]
          ItemWithKey.key = key
          list = list.concat(ItemWithKey)
        }
      }
      dispatch({
        type: FETCH_INSTRUCTOR_LIST,
        payload: list
      })
    })
  }
}

export function fetchShopList() {
  var list = []
  return dispatch => {
    firebase.database().ref('/shopItems/').once('value', snapshot => {
      var shopItems = snapshot.val()
      for (var key in shopItems) {
        if (shopItems.hasOwnProperty(key)) {
          let ItemWithKey = shopItems[key]
          ItemWithKey.key = key
          list = list.concat(ItemWithKey)
        }
      }
      dispatch({
        type: FETCH_SHOP_LIST,
        payload: list
      })
    })
  }
}

export function addPlace(data) {
  return dispatch => firebase.database().ref('/places/'+data.name).update({
    name: data.name,
    desc: data.desc,
    address: data.address
  })
}

export function addCourse(data) {
  if(data.special === "0") {
    data.special = false
  } else {
    data.special = true
  }

  if(data.date === 'undefined' || data.date === "") {
    data.date = null
  }

  return dispatch => CoursesRef.push({
    day: parseInt(data.day),
    end: parseInt(data.end),
    maxCapacity: parseInt(data.maxCapacity),
    special: data.special,
    start: parseInt(data.start),
    date: data.date
  })
}

export function addCourseType(data) {
  return dispatch => firebase.database().ref('/courseTypes/'+data.name).update({
    name: data.name,
    desc: data.desc
  })
}

export function addShopItem(data, type) {
  return dispatch => firebase.database().ref('/shopItems/'+data.title).update({
    title: data.title,
    desc: data.desc,
    price: data.price,
    type: type,
    expiresAfterDays: data.expiresAfterDays || null,
    usetimes: data.usetimes || null,
    usedays: data.usedays || null
  })
}

export function expandAdminList() {
  return dispatch => { dispatch ({
    type: EXPAND_ADMIN_LIST
    })
  }
}

export function minimizeAdminList() {
  return dispatch => { dispatch ({
    type: MINIMIZE_ADMIN_LIST
    })
  }
}

export function expandUserList() {
  return dispatch => { dispatch ({
    type: EXPAND_USER_LIST
    })
  }
}

export function minimizeUserList() {
  return dispatch => { dispatch ({
    type: MINIMIZE_USER_LIST
    })
  }
}

export function expandCourseList() {
  return dispatch => { dispatch ({
    type: EXPAND_COURSE_LIST
    })
  }
}

export function minimizeCourseList() {
  return dispatch => { dispatch ({
    type: MINIMIZE_COURSE_LIST
    })
  }
}

export function expandInstructorList() {
  return dispatch => { dispatch ({
    type: EXPAND_INSTRUCTOR_LIST
    })
  }
}

export function minimizeInstructorList() {
  return dispatch => { dispatch ({
    type: MINIMIZE_INSTRUCTOR_LIST
    })
  }
}

export function expandShopList() {
  return dispatch => { dispatch ({
    type: EXPAND_SHOP_LIST
    })
  }
}

export function minimizeShopList() {
  return dispatch => { dispatch ({
    type: MINIMIZE_SHOP_LIST
    })
  }
}

export function expandPlaceForm() {
  return dispatch => { dispatch ({
    type: EXPAND_PLACE_FORM
    })
  }
}

export function minimizePlaceForm() {
  return dispatch => { dispatch ({
    type: MINIMIZE_PLACE_FORM
    })
  }
}

export function expandCourseTypeForm() {
  return dispatch => { dispatch ({
    type: EXPAND_COURSE_TYPE_FORM
    })
  }
}

export function minimizeCourseTypeForm() {
  return dispatch => { dispatch ({
    type: MINIMIZE_COURSE_TYPE_FORM
    })
  }
}

export function expandCourseForm() {
  return dispatch => { dispatch ({
    type: EXPAND_COURSE_FORM
    })
  }
}

export function minimizeCourseForm() {
  return dispatch => { dispatch ({
    type: MINIMIZE_COURSE_FORM
    })
  }
}

export function expandSpecialCourseForm() {
  return dispatch => { dispatch ({
    type: EXPAND_SPECIAL_COURSE_FORM
    })
  }
}

export function minimizeSpecialCourseForm() {
  return dispatch => { dispatch ({
    type: MINIMIZE_SPECIAL_COURSE_FORM
    })
  }
}

export function expandTimeShopForm() {
  return dispatch => { dispatch ({
    type: EXPAND_TIME_SHOP_FORM
    })
  }
}

export function minimizeTimeShopForm() {
  return dispatch => { dispatch ({
    type: MINIMIZE_TIME_SHOP_FORM
    })
  }
}

export function expandCountShopForm() {
  return dispatch => { dispatch ({
    type: EXPAND_COUNT_SHOP_FORM
    })
  }
}

export function minimizeCountShopForm() {
  return dispatch => { dispatch ({
    type: MINIMIZE_COUNT_SHOP_FORM
    })
  }
}