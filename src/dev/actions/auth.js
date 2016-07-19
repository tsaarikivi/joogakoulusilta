import {
    ADD_USER,
    REMOVE_USER,
    AUTH_ERROR
} from './actionTypes.js'
import {
    createNewUser
} from './user.js'

const Auth = firebase.auth();

let registeringUser = false; //This is a flag to differentiate if user is authenticated for the first time
let firstName = null;
let surname = null;
let alias = null;

export function authListener() {
    return dispatch => {
        Auth.onAuthStateChanged(userdata => {
            console.log("Userdata: ", userdata);
            if (userdata) {
                var user = {}
                user.email = userdata.email;
                user.uid = userdata.uid;
                user.userdata = userdata;
                console.log("USER: ", user.uid, user.email);
                dispatch({
                    type: ADD_USER,
                    payload: user
                })
                if (registeringUser) {
                    registeringUser = false;
                    createNewUser(user, firstName, surname, alias);
                    firstName = null;
                    surname = null;
                    alias = null;
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
        Auth.signInWithEmailAndPassword(email, password).catch(error => {
            if (error) {
                dispatch({
                    type: AUTH_ERROR,
                    payload: {
                        error: {
                            code: error.code,
                            message: error.message
                        }
                    }
                })
            }
        });
    }
}

export function logout() {
    return dispatch => {
        Auth.signOut().then(() => {}, error => {
            if (error) {
                dispatch({
                    type: AUTH_ERROR,
                    payload: {
                        error: {
                            code: error.code,
                            message: error.message
                        }
                    }
                })
            }
        });
    }

}

export function register(email, password, fName, sName, a) {

    registeringUser = true;
    firstName = fName;
    surname = sName;
    alias = a;

    return dispatch => {
        Auth.createUserWithEmailAndPassword(email, password).catch(error => {
            if (error) {
                dispatch({
                    type: AUTH_ERROR,
                    payload: {
                        error: {
                            code: error.code,
                            message: error.message
                        }
                    }
                })
            }
        });
    }
}