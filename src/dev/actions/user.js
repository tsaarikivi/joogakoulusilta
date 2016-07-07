import { USER_DETAILS_UPDATED_IN_DB, STOP_UPDATING_USER_DETAILS_FROM_DB } from './actionTypes.js'

const Auth = firebase.auth();

var UserRef;

export function fetchUserDetails(uid) {
  UserRef = firebase.database().ref('/users/'+uid)
  var usr = null;
  let tmp = null
  return dispatch => {
    UserRef.on('value', snapshot => {
      usr = snapshot.val();
      usr.key = snapshot.key;
      dispatch({
        type: USER_DETAILS_UPDATED_IN_DB,
        payload: usr
      })
    }, err => {
      console.error("Getting user data failed: ", err);
    })
  }
}

export function finishedWithUserDetails(){
  console.log("ACTION: finished with user called");
  UserRef.off('value');
  return dispatch => {
      dispatch({
      type: STOP_UPDATING_USER_DETAILS_FROM_DB,
      payload : null
    })
  }
}

export function createNewUser(user) {
  console.log("ADDING USER:", user);
  var UIDUsersRef = firebase.database().ref('/users/'+user.uid)
  UIDUsersRef.update({
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
