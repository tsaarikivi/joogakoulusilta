import { ADD_USER, REMOVE_USER, AUTH_ERROR, FETCH_USER_DETAILS } from './actionTypes.js'

const Auth = firebase.auth();
const UsersRef = firebase.database().ref('/users/')

let registeringUser = false; //This is a flag to differentiate if user is authenticated for the first time

function fetchUserDetails(uid, dispatch) {
  console.log(1);
  var usr = null;
  console.log(2);
  UsersRef.orderByChild('uid').equalTo(uid).on('child_added', snapshot => {

    console.log("VAL", snapshot.val());
    console.log("KEY", snapshot.key);
    usr = snapshot.val();
    usr.key = snapshot.key;
    dispatch({
      type: FETCH_USER_DETAILS,
      payload: usr
    })
    })
}

function createNewUser(user) {
  console.log("ADDING USER:", user);
  UsersRef.push({
                  email: user.email,
                  uid: user.uid,
                  alias: "alias",
                  firstname: "firstname",
                  lastname: "lastname"
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


export function authListener() {
  return dispatch => {
    Auth.onAuthStateChanged( userdata => {
      if (userdata) {
        var user = {}
        user.email = userdata.email;
        user.uid = userdata.uid;
        user.userdata = userdata;
        console.log("USER:", user);
        dispatch({
          type: ADD_USER,
          payload: user
        })
        if(registeringUser){
          registeringUser = false;
          createNewUser(user);
        }
        console.log("LETS FETCH:", user.uid);
        fetchUserDetails(user.uid, dispatch);
      } else {
        dispatch({
          type: REMOVE_USER
        })
      }
    })
  }
}

export function login(email, password) {
  return dispatch => {
    Auth.signInWithEmailAndPassword(email, password).catch( error => {
      if(error){
        dispatch({
          type: AUTH_ERROR,
          payload: {error:{code: error.code, message: error.message}}
        })
      }
    });
  }
}

export function logout() {
  return dispatch => {
    Auth.signOut().then( () => {
      console.log("SIGN OUT SUCCESS!");
    }, error => {
      if(error){
        dispatch({
          type: AUTH_ERROR,
          payload: {error:{code: error.code, message: error.message}}
        })
      }
    });
  }

}

export function register(email, password) {

  registeringUser = true;
  return dispatch => {
    Auth.createUserWithEmailAndPassword(email, password).catch( error => {
      if(error){
        dispatch({
          type: AUTH_ERROR,
          payload: {error:{code: error.code, message: error.message}}
        })
      }
    });
  }
}
