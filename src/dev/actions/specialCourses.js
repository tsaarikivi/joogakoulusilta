import { FETCH_SPECIAL_COURSES } from './actionTypes.js'

const CoursesRef = firebase.database().ref('/courses/')

export function fetchSpecialCourses() {
  var list = []
  return dispatch => {
    CoursesRef.on('child_added', snapshot => {
      if (snapshot.val().special) {
        let specialCourseWithKey = snapshot.val();
        specialCourseWithKey.key = snapshot.key;
        list = list.concat(specialCourseWithKey);
        dispatch({
          type: FETCH_SPECIAL_COURSES,
          payload: list
        })
      }
    })
  }
}
