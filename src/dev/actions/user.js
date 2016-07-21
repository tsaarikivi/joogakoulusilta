import {
    UPDATE_USERS_BOOKINGS,
    UPDATE_USERS_TRANSACTIONS,
    USER_ERROR,
    USER_DETAILS_UPDATED_IN_DB,
    STOP_UPDATING_USER_DETAILS_FROM_DB
} from './actionTypes.js'

const Auth = firebase.auth();

var UserRef;
var TransactionsRef;
var BookingsRef;

export function updateUserDetails(user) {
    return dispatch => {
        firebase.database().ref('/users/' + user.uid).update(user)
            .catch(err => {
                dispatch({
                    type: USER_ERROR,
                    payload: err
                })
            })
    }
}

export function fetchUsersBookings(uid) {
    return dispatch => {
        var oneCourse;
        var allCourses;
        var oneBooking;
        var allBookings;
        var booking = {};
        var returnListBookings = [];
        var returnListHistory = [];
        var courseInfo = {}
        firebase.database().ref('/courses/').once('value')
            .then(snapshot => {
                courseInfo = snapshot.val()
                BookingsRef = firebase.database().ref('/bookingsbyuser/' + uid);
                BookingsRef.on('value', snapshot => {
                    allCourses = snapshot.val();
                    returnListBookings = Object.assign([]);
                    returnListHistory = Object.assign([]);
                    if (allCourses) {
                        for (oneCourse in allCourses) {
                            allBookings = allCourses[oneCourse]
                            for (oneBooking in allBookings) {
                                booking = Object.assign({}, allBookings[oneBooking]);
                                booking.course = oneCourse;
                                booking.courseInfo = courseInfo[oneCourse];
                                if (!booking.courseInfo) {
                                    dispatch({
                                        type: USER_ERROR,
                                        payload: {
                                            error: {
                                                code: "DB_INTEGRITY_ERR",
                                                message: "Referred course is missing from database: " + oneCourse
                                            }
                                        }
                                    })
                                } else {
                                    booking.courseInfo.key = oneCourse;
                                    if (booking.courseTime < Date.now()) {
                                        returnListHistory.push(booking)
                                    } else {
                                        returnListBookings.push(booking);
                                    }
                                }
                            }
                        }
                        returnListBookings.sort((a, b) => {
                            return a.courseTime - b.courseTime
                        })
                        returnListHistory.sort((a, b) => {
                            return a.courseTime - b.courseTime
                        })
                    }
                    dispatch({
                        type: UPDATE_USERS_BOOKINGS,
                        payload: {
                            bookings: returnListBookings,
                            history: returnListHistory
                        }
                    })
                }, err => {
                    console.error("Failed getting bookings: ", uid, err);
                    dispatch({
                        type: USER_ERROR,
                        payload: err
                    })
                })
            }, err => {
                console.error("Failed getting course info: ", uid, err);
                dispatch({
                    type: USER_ERROR,
                    payload: err
                })
            })
            .catch((err) => {
                console.error("Failed getting bookings: ", uid, err);
                dispatch({
                    type: USER_ERROR,
                    payload: err
                })
            })
    }
}

export function fetchUsersTransactions(uid) {
    return dispatch => {
        var transactions = null;
        TransactionsRef = firebase.database().ref('/transactions/' + uid);
        TransactionsRef.on('value', snapshot => {
            var trx = {
                time: 0,
                count: 0,
                firstexpire: 0,
                details: {
                    valid: [],
                    expired: []
                }
            };
            let now = Date.now();
            let all = snapshot.val();
            let one;
            var trxdetails = {};
            for (one in all) {
                trxdetails = Object.assign({}); //Need new object to be pushed to arrays
                trxdetails.purchasetime = one;
                trxdetails.type = all[one].type;
                trxdetails.expires = all[one].expires;
                trxdetails.paymentInstrumentType = all[one].details.transaction.paymentInstrumentType;
                trxdetails.shopItem = all[one].shopItem;
                switch (all[one].type) {
                    case "time":
                        if (all[one].expires > now) {
                            trx.time = all[one].expires;
                        }
                        break;
                    case "count":
                        trxdetails.unusedtimes = all[one].unusedtimes;
                        trxdetails.usetimes = all[one].usetimes;
                        if (all[one].expires > now) {
                            trx.count += all[one].unusedtimes;
                        }
                        if (all[one].expires < trx.firstexpire || trx.firstexpire === 0) {
                            if (all[one].unusedtimes > 0) {
                                trx.firstexpire = all[one].expires;
                            }
                        }
                        break;
                    default:
                        console.error("undefined transaction type: ", uid, all[one]);
                        break;
                }
                if (trxdetails.expires > now) {
                    trx.details.valid.push(trxdetails);
                } else {
                    trx.details.expired.push(trxdetails);
                }
            }
            trx.details.valid.sort((a, b) => {
                return a.expires - b.expires
            });
            trx.details.expired.sort((a, b) => {
                return a.expires - b.expires
            });

            dispatch({
                type: UPDATE_USERS_TRANSACTIONS,
                payload: {
                    transactions: trx
                }
            })
        }, err => {
            console.error("Fetching transactions failed: ", uid, err);
            dispatch({
                type: USER_ERROR,
                payload: err
            })
        })
    }
}

export function fetchUserDetails(uid) {
    UserRef = firebase.database().ref('/users/' + uid);
    var usr = null;
    let tmp = null
    return dispatch => {
        UserRef.on('value', snapshot => {
            usr = snapshot.val();
            usr.key = snapshot.key;
            firebase.database().ref('/specialUsers/' + usr.key).once('value')
                .then(snapshot => {
                    usr.roles = {
                        admin: false,
                        instructor: false
                    }
                    if (snapshot.val()) {
                        if (snapshot.val().admin) {
                            usr.roles.admin = snapshot.val().admin
                        }
                        if (snapshot.val().instructor) {
                            usr.roles.instructor = snapshot.val().instructor
                        }
                    }
                    dispatch({
                        type: USER_DETAILS_UPDATED_IN_DB,
                        payload: usr
                    })
                })
        }, err => {
            console.error("Getting user data failed: ", err);
            dispatch({
                type: USER_ERROR,
                payload: err
            })
        })
    }
}

export function finishedWithUserDetails() {
    if (UserRef) UserRef.off('value');
    if (TransactionsRef) TransactionsRef.off('value');
    if (BookingsRef) BookingsRef.off('value')
    return dispatch => {
        dispatch({
            type: STOP_UPDATING_USER_DETAILS_FROM_DB,
            payload: null
        })
    }
}

export function resetPassword(email) {
    return dispatch => {

        firebase.auth().sendPasswordResetEmail(email).then(() => {
                console.log("EMAIL RESET sent to user.")
            })
            .catch((error) => {
                console.error("Error from: sendPasswordResetEmail - ", error)
                dispatch({
                    type: USER_ERROR,
                    payload: {
                        error: {
                            code: "EMAIL_RESET_ERROR",
                            message: error.toString()
                        }
                    }
                })

            })

    }
}

export function sendEmailVerification() {
    return dispatch => {
        firebase.auth().currentUser.sendEmailVerification().then(() => {
                console.log("EMAIL verification request sent to user.")
            })
            .catch((error) => {
                console.error("Error from: sendEmailVerification - ", error)
                dispatch({
                    type: USER_ERROR,
                    payload: {
                        error: {
                            code: "EMAIL_VERIFICATION_ERROR",
                            message: error.toString()
                        }
                    }
                })
            })
    }
}

export function createNewUser(user, firstname, lastname, alias) {
    firebase.database().ref('/users/' + user.uid).once('value').then(snapshot => {
        if (snapshot.val() != null) {
            if (firstname === null) {
                console.log("currentUser", firebase.auth().currentUser)
                const displayName = firebase.auth().currentUser.displayName
                if (displayName) {
                    firstname = firebase.auth().currentUser.displayName;
                    console.log("THIS USER WAS FOUND IN AUTH SYSTEM")
                }                
            }
            return firebase.database().ref('/users/' + user.uid).update({
                email: user.email,
                uid: user.uid,
                firstname: firstname,
                lastname: lastname,
                alias: alias
            }).catch((error) => {
                if (error) {
                    console.error("Error writing new user to database", error);
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
    })
}