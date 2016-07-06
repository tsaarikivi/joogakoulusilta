import { ADD_USER, REMOVE_USER, AUTH_ERROR } from './actionTypes.js'
import { createNewUser } from './user.js'

const Auth = firebase.auth();
const UsersRef = firebase.database().ref('/users/')

let registeringUser = false; //This is a flag to differentiate if user is authenticated for the first time

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
