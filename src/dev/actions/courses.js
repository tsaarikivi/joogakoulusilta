import { FETCH_TIMETABLE, FETCH_SPECIAL_COURSES_BANNER, FETCH_SPECIAL_COURSES } from './actionTypes.js'

const CoursesRef = firebase.database().ref('/courses/')

export function fetchSpecialCourses() {
  var list = []
  return dispatch => {
    CoursesRef.orderByChild('date').on('child_added', snapshot => {
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
    CoursesRef.orderByChild('date').on('child_added', snapshot => {
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