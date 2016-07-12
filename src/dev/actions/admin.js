import { 
  FETCH_USER_LIST,
  FETCH_ADMIN_LIST,
  EXPAND_ADMIN_LIST,
  MINIMIZE_ADMIN_LIST,
  EXPAND_USER_LIST,
  MINIMIZE_USER_LIST

} from './actionTypes.js'

const UsersRef = firebase.database().ref('/users/')

export function fetchUserList() {
  var list = []
  return dispatch => {
    UsersRef.once('value', snapshot => {
      var users = snapshot.val()
      for (var key in users) {
        if (users.hasOwnProperty(key) && !users[key].admin) {
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
        if (users.hasOwnProperty(key) && users[key].admin) {
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

export function expandAdminList() {
  return dispatch => { dispatch ({
    type: EXPAND_ADMIN_LIST,
    })
  }
}

export function minimizeAdminList() {
  return dispatch => { dispatch ({
    type: MINIMIZE_ADMIN_LIST,
    })
  }
}

export function expandUserList() {
  return dispatch => { dispatch ({
    type: EXPAND_USER_LIST,
    })
  }
}

export function minimizeUserList() {
  return dispatch => { dispatch ({
    type: MINIMIZE_USER_LIST,
    })
  }
}