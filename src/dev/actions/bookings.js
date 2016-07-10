import axios from 'axios'

import {
  FETCH_BOOKINGS,
  CLEAR_BOOKINGS
} from './actionTypes.js'

var BookingsRef;

export function postCancellation(item, txRef, courseInfo){
  var JOOGAURL = typeof(JOOGASERVER) === "undefined" ? 'http://localhost:3000/cancelSlot' : JOOGASERVER+'/cancelSlot'
  console.log("JOOGASERVER: ", JOOGASERVER);
  console.log("JOOGAURL: ", JOOGAURL);
  return dispatch => {
    firebase.auth().currentUser.getToken(true).then( idToken => {
      axios.post(
        JOOGAURL, {
          user: idToken,
          courseInfo: courseInfo,
          cancelItem: item,
          transactionReference: txRef
        })
        .then( response => {
          console.log(response.data);
        })
        .catch( error => {
          console.error(error);
        });
      }).catch( error => {
        console.error("Failde to get authentication token for current user: ", error);
      });
  }
}

export function postReservation(forward, courseInfo){
  var JOOGAURL = typeof(JOOGASERVER) === "undefined" ? 'http://localhost:3000/reserveSlot' : JOOGASERVER+'/reserveSlot'
  console.log("JOOGASERVER: ", JOOGASERVER);
  console.log("JOOGAURL: ", JOOGAURL);
  return dispatch => {
    firebase.auth().currentUser.getToken(true).then( idToken => {
      axios.post(
        JOOGAURL, {
          user: idToken,
          courseInfo: courseInfo,
          weeksForward: forward
        })
        .then( response => {
          console.log(response.data);
        })
        .catch( error => {
          console.error(error);
        });
      }).catch( error => {
        console.error("Failde to get authentication token for current user: ", error);
      });
  }
}


export function fetchBookings(coursekey) {
  var list = [];
  BookingsRef = firebase.database().ref('/bookingsbycourse/'+coursekey);
  return dispatch => {
    var bkns = {};
    BookingsRef.on('value', snapshot => {
      bkns = snapshot.val();
      console.log("BOOOOOOOOOOOOOOOOOOOKINGS:", bkns);
      dispatch({
        type: FETCH_BOOKINGS,
        payload: bkns
      })
    }, err => {
      console.error("Error is fetching bookingsbycourse: ", err);
    });
  }
}

export function stopFetchBookings() {
  return dispatch => {
    BookingsRef.off('value');
    dispatch({
      type: CLEAR_BOOKINGS,
      payload: null
    })
  }
}
