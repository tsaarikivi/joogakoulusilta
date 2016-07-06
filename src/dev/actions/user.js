import { USER_DETAILS_UPDATED_IN_DB, STOP_UPDATING_USER_DETAILS_FROM_DB } from './actionTypes.js'

const Auth = firebase.auth();
const UsersRef = firebase.database().ref('/users/')


export function fetchUserDetails(uid) {
  var usr = null;
  let tmp = null
  return dispatch => {
    UsersRef.orderByChild('uid').equalTo(uid).on('value', snapshot => {
    for (tmp in snapshot.val()){
      usr = snapshot.val()[tmp];
      usr.key = tmp;
    }
    dispatch({
      type: USER_DETAILS_UPDATED_IN_DB,
      payload: usr
    })
    })
  }
}

export function finishedWithUserDetails(){
  console.log("ACTION: finished with user called");
  UsersRef.off('value')
  return dispatch => {
      dispatch({
      type: STOP_UPDATING_USER_DETAILS_FROM_DB,
      payload : null
    })
  }
}

export function createNewUser(user) {
  console.log("ADDING USER:", user);
  UsersRef.push({
                  email: user.email,
                  uid: user.uid,
                  alias: "alias",
                  firstname: "firstname",
                  lastname: "lastname",
                  tokens: {
                    usetimes: 0,
                    lastday: 0
                  }
  }, error => {
           if(error){
             console.error("Error writing new user to database", error);
             dispatch({
                  type: AUTH_ERROR,
                  payload: {error:{code: error.code, message: error.message}}
             })
          }
      })
}
