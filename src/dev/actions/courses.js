import { FETCH_TIMETABLE,
         FETCH_SPECIAL_COURSES_BANNER,
         FETCH_SPECIAL_COURSES,
         PUT_COURSE_INFO,
         REMOVE_COURSE_INFO } from './actionTypes.js'

const CoursesRef = firebase.database().ref('/courses/')

export function fetchSpecialCourses() {
  var list = Object.assign([])
  return dispatch => {
    CoursesRef.once('value', snapshot => {
      var courses = snapshot.val()
      for (var key in courses) {
        if (courses.hasOwnProperty(key) && courses[key].special) {
          let courseItemWithKey = courses[key]
          courseItemWithKey.key = key
          list = list.concat(courseItemWithKey)
        }
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
      var courses = snapshot.val()
      for (var key in courses) {
        if (courses.hasOwnProperty(key) && courses[key].special) {
          let courseItemWithKey = courses[key]
          courseItemWithKey.key = key
          list = list.concat(courseItemWithKey)
        }
      }
      dispatch({
        type: FETCH_SPECIAL_COURSES_BANNER,
        payload: list
      })
    })
  }
}

export function fetchTimetable() {
  var list = Object.assign([])
  return dispatch => {
    CoursesRef.once('value', snapshot => {
      var courses = snapshot.val()
      for (var key in courses) {
        if (courses.hasOwnProperty(key) && !courses[key].special) {
          let courseItemWithKey = courses[key]
          courseItemWithKey.key = key
          list = list.concat(courseItemWithKey)
        }
      }
      list.sort(function(a, b) {
        if (a.start && b.start) {
          return a.start - b.start
        }        
        return 0
      })
      dispatch({
        type: FETCH_TIMETABLE,
        payload: list
      })
    })
  }
}

export function putCourseInfo(course) {
  return {
    type: PUT_COURSE_INFO,
    payload: course
  }
}

export function removeCourseInfo() {
  return {
    type: REMOVE_COURSE_INFO
  }
}
