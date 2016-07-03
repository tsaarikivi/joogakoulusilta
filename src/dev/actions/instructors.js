import { FETCH_INSTRUCTOR_INFO } from './actionTypes.js'

const InstructorInfoRef = firebase.database().ref('/instructors/')

export function fetchInstructorInfo() {
  var list = []
  return dispatch => {
    InstructorInfoRef.on('child_added', snapshot => {
      let instructorInfoWithKey = snapshot.val()
      instructorInfoWithKey.key = snapshot.key
      list = list.concat(instructorInfoWithKey)
      dispatch({
        type: FETCH_INSTRUCTOR_INFO,
        payload: list
      })
    })
  }
}
