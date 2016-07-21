import { FETCH_SPECIAL_COURSES_BANNER,
         FETCH_SPECIAL_COURSES,
          } from './actionTypes.js'

const CoursesRef = firebase.database().ref('/specialCourses/')

export function fetchSpecialCourses() {
  var list = Object.assign([])
  return dispatch => {
    CoursesRef.once('value', snapshot => {
      var specialCourses = snapshot.val()
      for (var key in specialCourses) {
          let courseItemWithKey = specialCourses[key]
          courseItemWithKey.key = key
          list = list.concat(courseItemWithKey)
      }
      dispatch({
        type: FETCH_SPECIAL_COURSES,
        payload: list
      })
    })
  }
}

export function fetchSpecialCoursesBanner() {
  var list = Object.assign([])
  return dispatch => {
    CoursesRef.once('value', snapshot => {
      var specialCourses = snapshot.val()
      for (var key in specialCourses) {
          let courseItemWithKey = specialCourses[key]
          courseItemWithKey.key = key
          list = list.concat(courseItemWithKey)
      }
      dispatch({
        type: FETCH_SPECIAL_COURSES_BANNER,
        payload: list
      })
    })
  }
}
