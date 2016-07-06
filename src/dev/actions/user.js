import { FETCH_USER_DETAILS } from './actionTypes.js'

const Auth = firebase.auth();
const UsersRef = firebase.database().ref('/users/')


export function fetchUserDetails(uid) {
  var usr = null;
  return dispatch => {
    UsersRef.orderByChild('uid').equalTo(uid).on('child_added', snapshot => {

    usr = snapshot.val();
    usr.key = snapshot.key;
    dispatch({
      type: FETCH_USER_DETAILS,
      payload: usr
    })
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
