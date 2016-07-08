import { UPDATE_USERS_TRANSACTIONS, USER_ERROR, USER_DETAILS_UPDATED_IN_DB, STOP_UPDATING_USER_DETAILS_FROM_DB } from './actionTypes.js'

const Auth = firebase.auth();

var UserRef;
var TransactionsRef;

export function fetchUsersTransactions(uid){
  return dispatch => {
    var transactions = null;
    TransactionsRef = firebase.database().ref('/transactions/'+uid);
    TransactionsRef.on('value', snapshot => {
      var trx = {time: 0, count: 0};
      let now = Date.now();
      let all = snapshot.val();
      let one;
      for (one in all){
        console.log("ONE:",all[one]);
        if( all[one].type === "time"){
          if(all[one].expires > now){
            trx.time = all[one].expires;
          }
        }
        if( all[one].type === "count"){
          if(all[one].expires > now){
            trx.count += all[one].unusedtimes;
          }
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
