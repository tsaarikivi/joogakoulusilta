import { 
  FETCH_USER_LIST,
  FETCH_ADMIN_LIST,
  FETCH_COURSE_TYPE_LIST,
  FETCH_COURSE_LIST,
  FETCH_INSTRUCTOR_LIST,
  FETCH_SHOP_LIST,
  FETCH_PLACE_LIST,

  EXPAND_ADMIN_LIST,
  MINIMIZE_ADMIN_LIST,
  EXPAND_USER_LIST,
  MINIMIZE_USER_LIST,
  EXPAND_COURSE_TYPE_LIST,
  MINIMIZE_COURSE_TYPE_LIST,
  EXPAND_COURSE_LIST,
  MINIMIZE_COURSE_LIST,
  EXPAND_INSTRUCTOR_LIST,
  MINIMIZE_INSTRUCTOR_LIST,
  EXPAND_SHOP_LIST,
  MINIMIZE_SHOP_LIST,
  EXPAND_PLACE_LIST,
  MINIMIZE_PLACE_LIST,
  
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
        if (users.hasOwnProperty(key)  && !users[key].instructor) {
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

export function fetchCourseTypeList() {
  var list = []
  return dispatch => {
    firebase.database().ref('/courseTypes/').once('value', snapshot => {
      var courseTypes = snapshot.val()
      for (var key in courseTypes) {
        if (courseTypes.hasOwnProperty(key)) {
          let ItemWithKey = courseTypes[key]
          ItemWithKey.key = key
          list = list.concat(ItemWithKey)
        }
      }
      dispatch({
        type: FETCH_COURSE_TYPE_LIST,
        payload: list
      })
    })
  }
}

export function fetchCourseList() {
  var list = []
  return dispatch => {
    firebase.database().ref('/courses/').orderByChild('day').once('value', snapshot => {
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

export function fetchPlaceList() {
  var list = []
  return dispatch => {
    firebase.database().ref('/places/').once('value', snapshot => {
      var places = snapshot.val()
      for (var key in places) {
        if (places.hasOwnProperty(key)) {
          let ItemWithKey = places[key]
          ItemWithKey.key = key
          list = list.concat(ItemWithKey)
        }
      }
      dispatch({
        type: FETCH_PLACE_LIST,
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

export function addCourse(data, special) {
  var newPostKey = firebase.database().ref().child('/courses/').push().key

  var place = {}
  firebase.database().ref('/places/'+data.place).on("value", snapshot => {
    place = snapshot.val()
    let updates = {};
    updates['/courses/' + newPostKey + '/place/'] = place
    firebase.database().ref().update(updates)
  })

  var instructor = {}
  firebase.database().ref('/users/'+data.instructor).on("value", snapshot => {    
    instructor = snapshot.val()
    let updates = {};
    updates['/courses/' + newPostKey + '/instructor/'] = instructor
    firebase.database().ref().update(updates)
  })

  var courseType = {}
  firebase.database().ref('/courseTypes/'+data.courseType).on("value", snapshot => {
    courseType = snapshot.val()
    let updates = {};
    updates['/courses/' + newPostKey + '/courseType/'] = courseType
    firebase.database().ref().update(updates)
  })

  return dispatch => firebase.database().ref('/courses/' + newPostKey).update({
    special: special,
    start: parseInt(data.start)*36000,
    end: parseInt(data.end)*36000,
    maxCapacity: parseInt(data.maxCapacity),
    day: parseInt(data.day) || null,
    date: data.date || null
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

export function lockUser(key) {
  return dispatch => firebase.database().ref('/users/'+key).update({
    locked: true,
    instructor: null
  })
}

export function unlockUser(key) {
  return dispatch => firebase.database().ref('/users/'+key).update({
    locked: null
  })
}

export function lockShopItem(key) {
  return dispatch => firebase.database().ref('/shopItems/'+key).update({
    locked: true
  })
}

export function unlockShopItem(key) {
  return dispatch => firebase.database().ref('/shopItems/'+key).update({
    locked: null
  })
}

export function makeInstructor(key) {
  return dispatch => firebase.database().ref('/users/'+key).update({
    instructor: true
  })
}

export function unmakeInstructor(key) {
  return dispatch => firebase.database().ref('/users/'+key).update({
    instructor: null
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

export function expandCourseTypeList() {
  return dispatch => { dispatch ({
    type: EXPAND_COURSE_TYPE_LIST
    })
  }
}

export function minimizeCourseTypeList() {
  return dispatch => { dispatch ({
    type: MINIMIZE_COURSE_TYPE_LIST
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

export function expandPlaceList() {
  return dispatch => { dispatch ({
    type: EXPAND_PLACE_LIST
    })
  }
}

export function minimizePlaceList() {
  return dispatch => { dispatch ({
    type: MINIMIZE_PLACE_LIST
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