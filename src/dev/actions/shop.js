import axios from "axios"

import {
    START_CHECKOUT_FLOW,
    FETCH_SHOP_ITEMS,
    ADD_TO_CART,
    BUY_WITH_CASH,
    GET_CLIENT_TOKEN,
    DO_PURCHASE_TRANSACTION,
    CHECKOUT_ERROR,
    CHECKOUT_TIMEOUT,
    EXECUTE_CASH_PURCHASE
} from './actionTypes.js'

const ShopItemsRef = firebase.database().ref('/shopItems/')

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

export function executeCashPurchase(forUsr, itemKey) {
    return dispatch => {
        let JOOGAURL = typeof(JOOGASERVER) === "undefined" ? 'http://localhost:3000/cashbuy' : JOOGASERVER + '/cashbuy'

        firebase.auth().currentUser.getToken(true)
            .then(idToken => {
                return axios.post(JOOGAURL, {
                    for_user: forUsr,
                    item_key: itemKey,
                    current_user: idToken
                })
            })
            .then(result => {
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

export function doPurchaseTransaction(nonce, clientKey) {
    return dispatch => {
        let JOOGAURL = typeof(JOOGASERVER) === "undefined" ? 'http://localhost:3000/checkout' : JOOGASERVER + '/checkout'

        firebase.auth().currentUser.getToken(true)
            .then(idToken => {
                return axios.post(JOOGAURL, {
                    payment_method_nonce: nonce,
                    item_key: clientKey,
                    current_user: idToken
                })
            })
            .then(result => {
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