import { ADD_USER, REMOVE_USER, AUTH_ERROR } from './actionTypes.js'

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
      console.log("Error happened when logging in: ", error);
    });
  }
}

export function logout() {
  return dispatch => {
    Auth.signOut().then(function() {
      console.log("Signed out succesfully.");
    }, function(error) {
      console.log("Error happened when logging logging out: ", error);
    });
  }

}

export function register(email, password) {
  return dispatch => {
    Auth.createUserWithEmailAndPassword(email, password).catch(function(error) {
      console.log("Error happened when registering: ", error);
      if(error.code != 0){
        dispatch({
          type: AUTH_ERROR,
          payload: error
        })
      }
    });
  }
}
