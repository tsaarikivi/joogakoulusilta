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
  MINIMIZE_SHOP_LIST
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

export function expandAdminList() {
  return dispatch => { dispatch ({
    type: EXPAND_ADMIN_LIST,
    })
  }
}

export function minimizeAdminList() {
  return dispatch => { dispatch ({
    type: MINIMIZE_ADMIN_LIST,
    })
  }
}

export function expandUserList() {
  return dispatch => { dispatch ({
    type: EXPAND_USER_LIST,
    })
  }
}

export function minimizeUserList() {
  return dispatch => { dispatch ({
    type: MINIMIZE_USER_LIST,
    })
  }
}

export function expandCourseList() {
  return dispatch => { dispatch ({
    type: EXPAND_COURSE_LIST,
    })
  }
}

export function minimizeCourseList() {
  return dispatch => { dispatch ({
    type: MINIMIZE_COURSE_LIST,
    })
  }
}

export function expandInstructorList() {
  return dispatch => { dispatch ({
    type: EXPAND_INSTRUCTOR_LIST,
    })
  }
}

export function minimizeInstructorList() {
  return dispatch => { dispatch ({
    type: MINIMIZE_INSTRUCTOR_LIST,
    })
  }
}

export function expandShopList() {
  return dispatch => { dispatch ({
    type: EXPAND_SHOP_LIST,
    })
  }
}

export function minimizeShopList() {
  return dispatch => { dispatch ({
    type: MINIMIZE_SHOP_LIST,
    })
  }
}