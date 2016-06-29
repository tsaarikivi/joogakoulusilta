import { ADD_USER, REMOVE_USER } from './actionTypes.js'

const Auth = firebase.auth();

export function authListener() {
  return dispatch => {
    Auth.onAuthStateChanged(function(userdata) {
      console.log("Authentication state changed.");
      if (userdata) {
        var user = {}
        console.log("userdata that can be handled:",userdata);
        user.email = userdata.email;
        user.uid = userdata.uid;
        console.log("Adding user to redux state.");
        console.log("user is:", user);
        dispatch({
          type: ADD_USER,
          payload: user
        })
      } else {
        console.log("Removing user from redux state.");
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
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log("Error happened when logging in: " + errorCode + " " + errorMessage);
    });
  }
}

export function logout() {
  return dispatch => {
    Auth.signOut().then(function() {
      console.log("Signed out succesfully.");
    }, function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log("Error happened when logging logging out: " + errorCode + " " + errorMessage);
    });
  }

}

export function register(email, password) {
  return dispatch => {
    Auth.createUserWithEmailAndPassword(email, password).catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log("Error happened when registering: " + errorCode + " " + errorMessage);
    });
  }
}
