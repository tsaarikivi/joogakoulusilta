import { FETCH_TIMETABLE,
         FETCH_SPECIAL_COURSES_BANNER,
         FETCH_SPECIAL_COURSES,
         PUT_COURSE_INFO,
         REMOVE_COURSE_INFO } from './actionTypes.js'

const CoursesRef = firebase.database().ref('/courses/')

export function fetchSpecialCourses() {
  var list = []
  return dispatch => {
    CoursesRef.on('child_added', snapshot => {
      if (snapshot.val().special) {
        let courseWithKey = snapshot.val();
        courseWithKey.key = snapshot.key;
        list = list.concat(courseWithKey);
        dispatch({
          type: FETCH_SPECIAL_COURSES,
          payload: list
        })
      }
    })
  }
}

export function fetchSpecialCoursesBanner() {
  var list = []
  return dispatch => {
    CoursesRef.on('child_added', snapshot => {
      if (snapshot.val().special && list.length < 3) {
        let courseWithKey = snapshot.val();
        courseWithKey.key = snapshot.key;
        list = list.concat(courseWithKey);
        dispatch({
          type: FETCH_SPECIAL_COURSES_BANNER,
          payload: list
        })
      }
    })
  }
}

export function fetchTimetable() {
  var list = []
  return dispatch => {
    CoursesRef.orderByChild('start').on('child_added', snapshot => {
      if (!snapshot.val().special) {
        let courseWithKey = snapshot.val();
        courseWithKey.key = snapshot.key;
        list = list.concat(courseWithKey);
        dispatch({
          type: FETCH_TIMETABLE,
          payload: list
        })
      }
    })
  }
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