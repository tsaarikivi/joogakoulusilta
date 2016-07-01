import { ADD_USER, REMOVE_USER, AUTH_ERROR } from './actionTypes.js'

const Auth = firebase.auth();
const UsersRef = firebase.database().ref('/users/')

let registeringUser = false; //This is a flag to differentiate if user is authenticated for the first time

export function authListener() {
  return dispatch => {
    Auth.onAuthStateChanged(function(userdata) {
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
          console.log("REGISTERING USER:", user);
          UsersRef.push({
                          email:user.email,
                          name:user.uid
          },function(error){
              if(error){
                  console.error("Error writing new user to database", error);
                  dispatch({
                          type: AUTH_ERROR,
                          payload: {error:{code: error.code, message: error.message}}
                  })
              }
          });
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
    Auth.signInWithEmailAndPassword(email, password).catch(function(error) {
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
    Auth.signOut().then(function() {
    }, function(error) {
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
    Auth.createUserWithEmailAndPassword(email, password).catch(function(error) {
      if(error){
        dispatch({
          type: AUTH_ERROR,
          payload: {error:{code: error.code, message: error.message}}
        })
      }
    });
  }
}
