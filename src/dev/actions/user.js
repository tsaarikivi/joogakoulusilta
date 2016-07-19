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
                    for (oneCourse in allCourses) {
                        allBookings = allCourses[oneCourse]
                        for (oneBooking in allBookings) {
                            booking = Object.assign({}, allBookings[oneBooking]);
                            booking.course = oneCourse;
                            booking.courseInfo = courseInfo[oneCourse];
                            booking.courseInfo.key = oneCourse;
                            if (booking.courseTime < Date.now()) {
                                returnListHistory.push(booking)
                            } else {
                                returnListBookings.push(booking);
                            }
                        }
                    }
                    returnListBookings.sort((a, b) => {
                        return a.courseTime - b.courseTime
                    })
                    returnListHistory.sort((a, b) => {
                        return a.courseTime - b.courseTime
                    })

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

export function createNewUser(user, firstname, lastname) {
    let UIDUsersRef = firebase.database().ref('/users/' + user.uid)
    UIDUsersRef.update({
        email: user.email,
        uid: user.uid,
        firstname: firstname,
        lastname: lastname,
    }, error => {
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