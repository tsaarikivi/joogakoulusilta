import { FETCH_USER_LIST } from './actionTypes.js'

export function fetchUserList() {
  var list = []
  return dispatch => {
    firebase.database().ref('/users/').on('child_added', snapshot => {
      let userItemWithKey = snapshot.val();
      userItemWithKey.key = snapshot.key;
      list = list.concat(userItemWithKey);
      dispatch({
        type: FETCH_USER_LIST,
        payload: list
      })
    })
  }
}
