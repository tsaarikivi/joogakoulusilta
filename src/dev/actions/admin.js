import { FETCH_USER_LIST, FETCH_ADMIN_LIST } from './actionTypes.js'

const UsersRef = firebase.database().ref('/users/')

// TODO : ADD admin boolean to users and list here according

export function fetchUserList() {
  var list = []
  return dispatch => {
    UsersRef.once('value', snapshot => {
      var users = snapshot.val()
      for (var key in users) {
        if (users.hasOwnProperty(key)) {
          let userItemWithKey = users[key]
          userItemWithKey.key = key
          list = list.concat(userItemWithKey)
        }
      }
      dispatch({
        type: FETCH_USER_LIST,
        payload: list
      })
    })
  }
}

export function fetchAdminList() {
  var list = []
  return dispatch => {
    UsersRef.once('value', snapshot => {
      var users = snapshot.val()
      for (var key in users) {
        if (users.hasOwnProperty(key)) {
          let adminItemWithKey = users[key]
          adminItemWithKey.key = key
          list = list.concat(adminItemWithKey)
        }
      }
      dispatch({
        type: FETCH_ADMIN_LIST,
        payload: list
      })
    })
  }
}
