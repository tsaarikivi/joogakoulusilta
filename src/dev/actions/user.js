import { UPDATE_USERS_TRANSACTIONS, USER_ERROR, USER_DETAILS_UPDATED_IN_DB, STOP_UPDATING_USER_DETAILS_FROM_DB } from './actionTypes.js'

const Auth = firebase.auth();

var UserRef;
var TransactionsRef;

export function fetchUsersTransactions(uid){
  return dispatch => {
    var transactions = null;
    TransactionsRef = firebase.database().ref('/transactions/'+uid);
    TransactionsRef.on('value', snapshot => {
      var trx = {time: 0, count: 0, firstexpire: 0, details: {valid:[], expired:[]}};
      let now = Date.now();
      let all = snapshot.val();
      let one;
      var details={};
      for (one in all){
        console.log("ONE: ", all[one]);
        details = Object.assign({}); //Need new object to be pushed to arrays
        details.puchasetime = one;
        details.type = all[one].type;
        details.expires = all[one].expires;
        switch(all[one].type){
          case "time":
            if(all[one].expires > now){
              trx.time = all[one].expires;
            }
          break;
          case "count":
            details.unusedtimes = all[one].unusedtimes;
            details.usetimes = all[one].usetimes;
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
        console.log("DETAILS: ", details);
        if(details.expires > now){
          trx.details.valid.push(details);
          console.log("VALID: ", trx.details.valid);
        } else {
          trx.details.expired.push(details);
          console.log("EXPIRED: ", trx.details.expired);
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
  console.log("UUUUSEEERRR: ", UserRef);
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
  console.log("ACTION: finished with user called");
  UserRef.off('value');
  TransactionsRef.off('value');
  return dispatch => {
      dispatch({
      type: STOP_UPDATING_USER_DETAILS_FROM_DB,
      payload : null
    })
  }
}

export function createNewUser(user) {
  console.log("ADDING USER:", user);
  let UIDUsersRef = firebase.database().ref('/users/'+user.uid)
  UIDUsersRef.update({
                  email: user.email,
                  uid: user.uid,
                  alias: "alias",
                  firstname: "firstname",
                  lastname: "lastname",
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
