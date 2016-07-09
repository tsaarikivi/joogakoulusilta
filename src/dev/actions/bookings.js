import { FETCH_BOOKINGS, CLEAR_BOOKINGS} from './actionTypes.js'

var BookingsRef;

export function fetchBookings(coursekey) {
  var list = [];
  BookingsRef = firebase.database().ref('/bookingsbycourse/'+coursekey);
  return dispatch => {
    var bkns = {};
    BookingsRef.on('value', snapshot => {
      bkns = snapshot.val();
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
