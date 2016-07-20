import {
    ADD_USER,
    REMOVE_USER,
    AUTH_ERROR,
    AUTH_TIMEOUT,
    EMAIL_UPDATED,
    PASSWORD_UPDATED,
} from './actionTypes.js'
import {
    createNewUser
} from './user.js'

const Auth = firebase.auth();

let registeringUser = false; //This is a flag to differentiate if user is authenticated for the first time
let firstName = null;
let surname = null;
let alias = null;

export function waitForMilliseconds(milliseconds) {
    return dispatch => {
        setTimeout(() => {
            dispatch({
                type: AUTH_TIMEOUT,
                payload: {
                    timeout: true
                }
            })
        }, milliseconds);
    }
}

export function authListener() {
    return dispatch => {
        Auth.onAuthStateChanged(userdata => {
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
                console.log("REMOVE_USR")
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

//TODO: this does not work.... Weird errors....
export function updateEmailAddress(oldEmail, oldPdw, newEmail) {
    console.log("AUTH: change of email:", oldEmail, oldPdw, newEmail)
    return dispatch => {
        console.log("1111", firebase)
        console.log("2222", firebase.auth.EmailAuthProvider)
        var credential = firebase.auth.EmailAuthProvider.credential(oldEmail, oldPdw);
        console.log("CREDENTIAL:", credential)
        var user = firebase.auth().currentUser
        user.reauthenticate(credential).then(() => {
            console.log("3333")
            user.updateEmail(newEmail).then(
                () => {
                    console.log("4444")
                    dispatch({
                        type: EMAIL_UPDATED,
                        payload: {
                            error: {
                                code: "0",
                                message: "no error"
                            },
                            emailUpdated: true
                        }
                    })
                }, (error) => {
                    if (error) {
                        console.log("UPDATEEMAIL error", error)
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
                }
            )
        }, (error) => {
            if (error) {
                console.log("REAUTH error", error)
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
        })

    }
}

export function updatePassword(oldEmail, oldPdw, newPassword) {
    console.log("AUTH: change of pwd:", newPassword)
    return dispatch => {
        console.log("1111", firebase)
        console.log("2222", firebase.auth.EmailAuthProvider)
        var credential = firebase.auth.EmailAuthProvider.credential(oldEmail, oldPdw);
        console.log("CREDENTIAL:", credential)
        var user = firebase.auth().currentUser
        user.reauthenticate(credential).then(() => {
            console.log("3333")
            user.updatePassword(newPassword).then(
                () => {
                    dispatch({
                        type: PASSWORD_UPDATED,
                        payload: {
                            error: {
                                code: "0",
                                message: "no error"
                            },
                            passwordUpdated: true
                        }
                    })
                }, (error) => {
                    if (error) {
                        console.log("auth error", error)
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
                }
            )
        }, (error) => {
            if (error) {
                console.log("REAUTH error", error)
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
        })


    }
}