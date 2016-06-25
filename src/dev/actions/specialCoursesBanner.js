import { FETCH_SPECIAL_COURSES_BANNER } from './actionTypes.js'

const CoursesRef = firebase.database().ref('/courses/')

export function fetchSpecialCoursesBanner() {
  var list = []
  return dispatch => {
    CoursesRef.on('child_added', snapshot => {
      if (snapshot.val().special && list.length < 3) {
        let specialCourseWithKey = snapshot.val();
        specialCourseWithKey.key = snapshot.key;
        list = list.concat(specialCourseWithKey);
        dispatch({
          type: FETCH_SPECIAL_COURSES_BANNER,
          payload: list
        })
      }
    })
  }
}
