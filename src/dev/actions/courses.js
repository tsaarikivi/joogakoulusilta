import { FETCH_TIMETABLE,
         PUT_COURSE_INFO,
         REMOVE_COURSE_INFO } from './actionTypes.js'

const CoursesRef = firebase.database().ref('/courses/')

export function fetchTimetable() {
  var list = Object.assign([])
  return dispatch => {
    CoursesRef.once('value', snapshot => {
      var courses = snapshot.val()
      for (var key in courses) {
          let courseItemWithKey = courses[key]
          courseItemWithKey.key = key
          list = list.concat(courseItemWithKey)
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
