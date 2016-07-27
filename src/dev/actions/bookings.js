import axios from 'axios'

import {
    FETCH_COURSE_BOOKINGS,
    CHANGE_LOADINGSCREEN_STATE
} from './actionTypes.js'

import {
    _setLoadingScreenOff
} from './loadingScreen.js'

var BookingsRef;

export function postCancellation(item, txRef, courseInfo) {
    var JOOGAURL = typeof(JOOGASERVER) === "undefined" ? 'http://localhost:3000/cancelSlot' : JOOGASERVER + '/cancelSlot'
    return dispatch => {
        let now = new Date();
        firebase.auth().currentUser.getToken(true).then(idToken => {
            axios.post(
                    JOOGAURL, {
                        user: idToken,
                        courseInfo: courseInfo,
                        cancelItem: item,
                        transactionReference: txRef,
                        timezoneOffset: now.getTimezoneOffset() * 60 * 1000
                    })
                .then(response => {
                    console.log(response.data);
                    _setLoadingScreenOff(dispatch, response.data.message)
                })
                .catch(error => {
                    console.error(error);
                });
        }).catch(error => {
            console.error("Failde to get authentication token for current user: ", error);
        });
    }
}

export function postReservation(forward, courseInfo) {
    var JOOGAURL = typeof(JOOGASERVER) === "undefined" ? 'http://localhost:3000/reserveSlot' : JOOGASERVER + '/reserveSlot'
    return dispatch => {
        let now = new Date();
        firebase.auth().currentUser.getToken(true).then(idToken => {
            axios.post(
                    JOOGAURL, {
                        user: idToken,
                        courseInfo: courseInfo,
                        weeksForward: forward,
                        timezoneOffset: now.getTimezoneOffset() * 60 * 1000
                    })
                .then(response => {
                    console.log(response.data); // Should process the data - for now ther is no need.
                })
                .catch(error => {
                    console.error(error);
                });
        }).catch(error => {
            console.error("Failde to get authentication token for current user: ", error);
        });
    }
}

function processBookings(inputBookings, uid, bookings, userbookings) {
    let instanceId;
    let instanceObj;
    let booking = {}
    let user;
    let index = 0;
    for (instanceId in inputBookings) {
        //Booking is in the future - it counts!!
        if (instanceId > Date.now()) {
            booking.instance = instanceId;
            booking.reservations = 0;
            booking.participants = [];
            instanceObj = inputBookings[instanceId];
            for (user in instanceObj) {
                booking.reservations++;
                booking.participants.push(instanceObj[user].user);
                if (user === uid) {
                    userbookings.push(Object.assign({
                        item: instanceId,
                        txRef: instanceObj[user].transactionReference
                    }));
                }
            }
            bookings.push(Object.assign({}, booking))
            index++;
        }
    }
    userbookings.sort((a, b) => {
        return a.item - b.item
    });
    bookings.sort((a, b) => {
        return a.instance - b.instance
    })
}

export function fetchCourseBookings(coursekey, uid) {
    var bookings = [];
    var userbookings = [];

    return dispatch => {
        var bkns = {};
        var returnObject;
        //Clear the booking details in case there are no bookings and the
        firebase.database().ref('/bookingsbycourse/' + coursekey).on('value', snapshot => {
            bkns = snapshot.val();
            bookings = Object.assign([]);
            userbookings = Object.assign([]);
            processBookings(bkns, uid, bookings, userbookings)
            returnObject = Object.assign({})
            returnObject[coursekey] = {
                all: bookings,
                user: userbookings
            }
            dispatch({
                type: FETCH_COURSE_BOOKINGS,
                payload: returnObject
            })
        }, err => {
            console.error("Error is fetching bookingsbycourse: ", err);
        });
    }
}

export function stopfetchCourseBookings(coursekey) {
    return dispatch => {
        firebase.database().ref('/bookingsbycourse/' + coursekey).off('value');
    }
}