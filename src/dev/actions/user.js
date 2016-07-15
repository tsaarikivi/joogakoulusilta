import { UPDATE_USERS_BOOKINGS, UPDATE_USERS_TRANSACTIONS, USER_ERROR, USER_DETAILS_UPDATED_IN_DB, STOP_UPDATING_USER_DETAILS_FROM_DB } from './actionTypes.js'

const Auth = firebase.auth();

var UserRef;
var TransactionsRef;
var BookingsRef;

export function fetchUsersBookings(uid){
  return dispatch => {
    var bkn = null;
    BookingsRef = firebase.database().ref('/bookingsbyuser/'+uid);
    BookingsRef.on('value', snapshot => {
      bkn = snapshot.val();
      dispatch({
        type: UPDATE_USERS_BOOKINGS,
        payload: {bookings: bkn}
      })
    }, err => {
      console.error("Failed getting bookings: ",uid, err);
      dispatch({
        type: USER_ERROR,
        payload: err
      })
    })
  }
}

export function fetchUsersTransactions(uid){
  return dispatch => {
    var transactions = null;
    TransactionsRef = firebase.database().ref('/transactions/'+uid);
    TransactionsRef.on('value', snapshot => {
      var trx = {time: 0, count: 0, firstexpire: 0, details: {valid:[], expired:[]}};
      let now = Date.now();
      let all = snapshot.val();
      let one;
      var trxdetails={};
      for (one in all){
        trxdetails = Object.assign({}); //Need new object to be pushed to arrays
        trxdetails.puchasetime = one;
        trxdetails.type = all[one].type;
        trxdetails.expires = all[one].expires;
        switch(all[one].type){
          case "time":
            if(all[one].expires > now){
              trx.time = all[one].expires;
            }
          break;
          case "count":
            trxdetails.unusedtimes = all[one].unusedtimes;
            trxdetails.usetimes = all[one].usetimes;
            if(all[one].expires > now){
              trx.count += all[one].unusedtimes;
            }
            if(all[one].expires < trx.firstexpire || trx.firstexpire === 0){
              if(all[one].unusedtimes > 0){
                trx.firstexpire = all[one].expires;
              }
            }
          break;
          default:
            console.error("undefined transaction type: ",uid , all[one]);
          break;
        }
        if(trxdetails.expires > now){
          trx.details.valid.push(trxdetails);
        } else {
          trx.details.expired.push(trxdetails);
        }
      }
      dispatch({
        type: UPDATE_USERS_TRANSACTIONS,
        payload: {transactions: trx}
      })
    }, err => {
      console.error("Fetching transactions failed: ",uid, err);
      dispatch({
        type: USER_ERROR,
        payload: err
      })
    })
  }
}

export function fetchUserDetails(uid) {
  UserRef = firebase.database().ref('/users/'+uid);
  var usr = null;
  let tmp = null
  return dispatch => {
    UserRef.on('value', snapshot => {
      usr = snapshot.val();
      usr.key = snapshot.key;
      dispatch({
        type: USER_DETAILS_UPDATED_IN_DB,
        payload: usr
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

export function finishedWithUserDetails(){
  if(UserRef) UserRef.off('value');
  if(TransactionsRef) TransactionsRef.off('value');
  if(BookingsRef) BookingsRef.off('value')
  return dispatch => {
      dispatch({
      type: STOP_UPDATING_USER_DETAILS_FROM_DB,
      payload : null
    })
  }
}

export function createNewUser(user, firstname, lastname) {
  let UIDUsersRef = firebase.database().ref('/users/'+user.uid)
  UIDUsersRef.update({
                  email: user.email,
                  uid: user.uid,
                  firstname: firstname,
                  lastname: lastname,
  }, error => {
           if(error){
             console.error("Error writing new user to database", error);
             dispatch({
                  type: AUTH_ERROR,
                  payload: {error:{code: error.code, message: error.message}}
             })
          }
      })
}
