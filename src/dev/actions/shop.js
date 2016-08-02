import axios from "axios"

import {
    START_CHECKOUT_FLOW,
    FETCH_SHOP_ITEMS,
    ADD_TO_CART,
    BUY_WITH_CASH,
    BUY_WITH_PAYTRAIL,
    GET_CLIENT_TOKEN,
    DO_PURCHASE_TRANSACTION,
    CHECKOUT_ERROR,
    CHECKOUT_TIMEOUT,
    EXECUTE_CASH_PURCHASE,
    RESET_SHOP,
    FETCH_PENDING_TRANSACTIONS
} from './actionTypes.js'

import {
    _hideLoadingScreen,
    _showLoadingScreen
} from './loadingScreen.js'

const ShopItemsRef = firebase.database().ref('/shopItems/')

export function completePaytrailPayment(pendingTrxId){
    return dispatch => {
                _showLoadingScreen(dispatch, "Hyväksytään osto")
        let JOOGAURL = typeof(JOOGASERVER) === "undefined" ? 'http://localhost:3000/approveincomplete' : JOOGASERVER + '/approveincomplete'
        firebase.auth().currentUser.getToken(true)
            .then(idToken => {
                return axios.post(JOOGAURL, {
                    current_user: idToken,
                    pending_transaction_id: pendingTrxId
                })
            })
            .then(response => {
                _hideLoadingScreen(dispatch, "Osto hyväksytty", true)
            })
            .catch(error => {
                console.error("PAYTRAIL_ERROR:", error);
                _hideLoadingScreen(dispatch, "Oston hyväksymisessä tapahtui virhe: ", error.toString(), false)
                dispatch({
                    type: CHECKOUT_ERROR,
                    payload: {
                        error: {
                            code: "PAYTRAIL_ERROR",
                            message: "Paytrail complete error: " + error.toString()
                        }
                    }
                })
            });

    } 
}


export function fetchPendingTransactions(){
    var list = [];
    return dispatch => {
        var returnObject = {}
        firebase.database().ref('/pendingtransactions/').on('value', snapshot => {
            list = Object.assign([])
            if(snapshot.val() !== null){
                let allTrx = snapshot.val();
                for(let key in allTrx){
                    allTrx[key].key = key;
                    list = list.concat(allTrx[key])
                }
            }
            returnObject = Object.assign({}, {
                list: list
            })
            dispatch({
                type: FETCH_PENDING_TRANSACTIONS,
                payload: returnObject
            });
        }, error => {
            console.error("Error in fetching pending transactions: ", error);
        })
    }
}

export function  stopFetchPendingTransactions(){
    return dispatch => {
        firebase.database().ref('/pendingtransactions/').off('value');
        dispatch({
            type: FETCH_PENDING_TRANSACTIONS,
            payload: {list: []}
        });
    }
}

export function resetShop(shopItems = null){
    return dispatch => {
        if(shopItems === null){
            dispatch({
                type: RESET_SHOP
            })
        } else {
            if(shopItems.initializedTransaction !== "0"){ //We need to clear the pending transaction.
                _cancelPaytrailPayment(dispatch, shopItems.initializedTransaction);
            }
        }
    }
}

export function buyWithPaytrail(pendingTrxId) {
    return dispatch => {
        dispatch({
            type: BUY_WITH_PAYTRAIL,
            payload: {
                phase: "payTrailPayment",
                error: {
                    code: "0",
                    message: "no error"
                }
            }
        })
    }
}

export function finishPayTrailTransaction(query){
        return dispatch => {
        _showLoadingScreen(dispatch, "Viimeistellään osto")
        let JOOGAURL = typeof(JOOGASERVER) === "undefined" ? 'http://localhost:3000/completepaytrail' : JOOGASERVER + '/completepaytrail'
        firebase.auth().currentUser.getToken(true)
            .then(idToken => {
                return axios.post(JOOGAURL, {
                    current_user: idToken,
                    METHOD: query.METHOD,
                    ORDER_NUMBER: query.ORDER_NUMBER,
                    PAID: query.PAID,
                    RETURN_AUTHCODE: query.RETURN_AUTHCODE,
                    TIMESTAMP: query.TIMESTAMP
                })
            })
            .then(response => {
                _hideLoadingScreen(dispatch, "Osto valmis", true)
                dispatch({
                    type: BUY_WITH_PAYTRAIL,
                    payload: {
                        phase: "payTrailComplete",
                        error: {
                            code: "0",
                            message: "no error"
                        }
                    }
                })
            })
            .catch(error => {
                console.error("PAYTRAIL_ERROR:", error);
                _hideLoadingScreen(dispatch, "Oston viimeistelyssä tapahtui virhe: ", error.toString(), false)
                dispatch({
                    type: CHECKOUT_ERROR,
                    payload: {
                        error: {
                            code: "PAYTRAIL_ERROR",
                            message: "Paytrail complete error: " + error.toString()
                        }
                    }
                })
            });
    }  
}

export function getAuthCode(_authcode) {
    return dispatch => {
        _showLoadingScreen(dispatch, "Haetaan tunnistekoodia")
        let JOOGAURL = typeof(JOOGASERVER) === "undefined" ? 'http://localhost:3000/paytrailauthcode' : JOOGASERVER + '/paytrailauthcode'
        firebase.auth().currentUser.getToken(true)
            .then(idToken => {
                return axios.post(JOOGAURL, {
                    current_user: idToken,
                    auth_code: _authcode
                })
            })
            .then(response => {
                _hideLoadingScreen(dispatch, "Tunniste valmis", true)
                dispatch({
                    type: BUY_WITH_PAYTRAIL,
                    payload: {
                        authCode: response.data,
                        error: {
                            code: "0",
                            message: "no error"
                        }
                    }
                })
            })
            .catch(error => {
                console.error("AUTHCODE_ERROR:", error);
                _hideLoadingScreen(dispatch, "Tunnisteen hakemisessa tapahtui virhe: ", error.toString(), false)
                dispatch({
                    type: CHECKOUT_ERROR,
                    payload: {
                        error: {
                            code: "AUTHCODE_ERROR",
                            message: "AuthCode error: " + error.toString()
                        }
                    }
                })
            });
    }
}

export function cancelPaytrailPayment(pendingTrxId){
    return dispatch => {
        _cancelPaytrailPayment(dispatch, pendingTrxId)
    } 
}


function _cancelPaytrailPayment(dispatch, pendingTrxId) {
    _showLoadingScreen(dispatch, "Perutaan PayTrail maksu")
    let JOOGAURL = typeof(JOOGASERVER) === "undefined" ? 'http://localhost:3000/cnacelpaytrailtransaction' : JOOGASERVER + '/cancelpaytrailtransaction'

    firebase.auth().currentUser.getToken(true)
        .then(idToken => {
            return axios.post(JOOGAURL, {
                current_user: idToken,
                pending_transaction: pendingTrxId
            })
        })
        .then(result => {
            _hideLoadingScreen(dispatch, "Maksun peruminen onnistui", true)
            dispatch({
                type: RESET_SHOP
            })
        })
        .catch(error => {
            console.error("PURCHASE ERROR", error);
            _hideLoadingScreen(dispatch, "Maksun perumisessa tapahtui virhe: "+ error.toString(), false)
            dispatch({
                type: CHECKOUT_ERROR,
                payload: {
                    error: {
                        code: "PURCHASE_ERROR",
                        message: "Purchase error: " + error.toString()
                    }
                }
            })
        })
}

export function initializePayTrailTransaction(clientKey, type) {
    return dispatch => {
        _showLoadingScreen(dispatch, "Alustetaan PayTrail maksu")
        let JOOGAURL = typeof(JOOGASERVER) === "undefined" ? 'http://localhost:3000/initializepaytrailtransaction' : JOOGASERVER + '/initializepaytrailtransaction'

        firebase.auth().currentUser.getToken(true)
            .then(idToken => {
                return axios.post(JOOGAURL, {
                    item_key: clientKey,
                    current_user: idToken,
                    purchase_target: type
                })
            })
            .then(result => {
                _hideLoadingScreen(dispatch, "Maksun alustus onnistui", true)
                dispatch({
                    type: DO_PURCHASE_TRANSACTION,
                    payload: {
                        phase: "payTrailInitialized",
                        initializedTransaction: result.data,
                        error: {
                            code: "0",
                            message: "no error"
                        }
                    }
                })
            })
            .catch(error => {
                console.error("PURCHASE ERROR", error);
                _hideLoadingScreen(dispatch, "Maksun suorituksessa tapahtui virhe: "+ error.toString(), false)
                dispatch({
                    type: CHECKOUT_ERROR,
                    payload: {
                        error: {
                            code: "PURCHASE_ERROR",
                            message: "Purchase error: " + error.toString()
                        }
                    }
                })
            })
    }
}

export function buyWithCash() {
    return dispatch => {
        dispatch({
            type: BUY_WITH_CASH,
            payload: {
                phase: "cashPayment",
                error: {
                    code: "0",
                    message: "no error"
                }
            }
        })
    }
}

export function executeCashPurchase(forUsr, itemKey, type) {
    return dispatch => {

        let JOOGAURL = typeof(JOOGASERVER) === "undefined" ? 'http://localhost:3000/cashbuy' : JOOGASERVER + '/cashbuy'
        _showLoadingScreen(dispatch, "Käteisostoa suoritetaan")
        firebase.auth().currentUser.getToken(true)
            .then(idToken => {
                return axios.post(JOOGAURL, {
                    for_user: forUsr,
                    item_key: itemKey,
                    current_user: idToken,
                    purchase_target: type
                })
            })
            .then(result => {
                _hideLoadingScreen(dispatch, "Käteisosto onnistui", true)
                dispatch({
                    type: EXECUTE_CASH_PURCHASE,
                    payload: {
                        cart: {},
                        phase: "done",
                        purchaseResult: result,
                        error: {
                            code: "0",
                            message: "no error"
                        }
                    }
                })
            })
            .catch(error => {
                console.error("CASH ERROR", error);
                _hideLoadingScreen(dispatch, "Käteisostossa tapahtui virhe: " + error.toString(), false)
                dispatch({
                    type: CHECKOUT_ERROR,
                    payload: {
                        error: {
                            code: "CASH_ERROR",
                            message: "Cash error: " + error.toString()
                        }
                    }
                })
            })
    }
}

export function waitForMilliseconds(milliseconds) {
    return dispatch => {
        setTimeout(() => {
            dispatch({
                type: CHECKOUT_TIMEOUT,
                payload: {
                    phase: "timeout"
                }
            })
        }, milliseconds);
    }
}

export function fetchShopItems() {
    var list = Object.assign([])
    return dispatch => {
        ShopItemsRef.once('value', snapshot => {
                var shopItems = snapshot.val()
                for (var key in shopItems) {
                    if (shopItems.hasOwnProperty(key) && !shopItems[key].locked) {
                        let shopItemWithKey = shopItems[key]
                        shopItemWithKey.key = key
                        list = list.concat(shopItemWithKey)
                    }
                }
                dispatch({
                    type: FETCH_SHOP_ITEMS,
                    payload: {
                        items: list
                    }
                })
            })
            .catch(err => {
                console.error("Cant read shopitems: ", err);
            })
    }
}

export function addToCart(item) {
    return dispatch => {
        dispatch({
            type: ADD_TO_CART,
            payload: {
                cart: item,
                error: {
                    code: "0",
                    message: "no error"
                }
            }
        })
    }
}

export function checkoutError(error) {
    return dispatch => {
        dispatch({
            type: CHECKOUT_ERROR,
            payload: {
                error: {
                    code: "CHECKOUT_ERR",
                    message: "Checkout error: " + error.toString()
                }
            }
        })
    }
}

export function removeShopItem(key) {
    return dispatch => ShopItemsRef.child(key).remove()
}

export function getClientTokenFromBraintree() {
    return dispatch => {
        _showLoadingScreen(dispatch, "Alustetaan maksuyhteyttä")
        dispatch({
            type: START_CHECKOUT_FLOW,
            payload: {
                phase: "braintreePayment",
            }
        })
        let JOOGAURL = typeof(JOOGASERVER) === "undefined" ? 'http://localhost:3000/clientToken' : JOOGASERVER + '/clientToken'
        firebase.auth().currentUser.getToken(true)
            .then(idToken => {
                return axios.get(JOOGAURL + '?token=' + idToken)
            })
            .then(response => {
                _hideLoadingScreen(dispatch, "Maksuyhteys valmis", true)
                dispatch({
                    type: GET_CLIENT_TOKEN,
                    payload: {
                        token: response.data,
                        phase: "tokenReceived"
                    }
                })
            })
            .catch(error => {
                console.error("TOKEN_ERROR:", error);
                _hideLoadingScreen(dispatch, "Maksuyhteyden alustuksessa tapahtui virhe: ", error.toString(), false)
                dispatch({
                    type: CHECKOUT_ERROR,
                    payload: {
                        error: {
                            code: "TOKEN_ERROR",
                            message: "ClientToken error: " + error.toString()
                        }
                    }
                })
            });
    }
}

export function doPurchaseTransaction(nonce, clientKey, type) {
    return dispatch => {
        _showLoadingScreen(dispatch, "Suoritetaan maksu.")
        let JOOGAURL = typeof(JOOGASERVER) === "undefined" ? 'http://localhost:3000/checkout' : JOOGASERVER + '/checkout'

        firebase.auth().currentUser.getToken(true)
            .then(idToken => {
                return axios.post(JOOGAURL, {
                    payment_method_nonce: nonce,
                    item_key: clientKey,
                    current_user: idToken,
                    purchase_target: type
                })
            })
            .then(result => {
                _hideLoadingScreen(dispatch, "Maksun suoritus onnistui", true)
                dispatch({
                    type: DO_PURCHASE_TRANSACTION,
                    payload: {
                        cart: {},
                        phase: "done",
                        purchaseResult: result,
                        error: {
                            code: "0",
                            message: "no error"
                        }
                    }
                })
            })
            .catch(error => {
                console.error("PURCHASE ERROR", error);
                _hideLoadingScreen(dispatch, "Maksun suorituksessa tapahtui virhe: "+ error.toString(), false)
                dispatch({
                    type: CHECKOUT_ERROR,
                    payload: {
                        error: {
                            code: "PURCHASE_ERROR",
                            message: "Purchase error: " + error.toString()
                        }
                    }
                })
            })
    }
}

