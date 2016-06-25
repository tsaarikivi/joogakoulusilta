import { FETCH_SPECIAL_COURSES } from './actionTypes.js'

const SpecialCoursesRef = firebase.database().ref('/specialCourses/')

export function fetchSpecialCourses() {
  var list = []
  return dispatch => {
    SpecialCoursesRef.on('child_added', snapshot => {
      let specialCourseWithKey = snapshot.val();
      specialCourseWithKey.key = snapshot.key;
      list = list.concat(specialCourseWithKey);
      dispatch({
        type: FETCH_SPECIAL_COURSES,
        payload: list
      })
    })
  }
}
