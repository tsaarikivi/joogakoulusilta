import axios from "axios"

import {
  START_CHECKOUT_FLOW,
  FETCH_SHOP_ITEMS,
  ADD_TO_CART,
  GET_CLIENT_TOKEN,
  DO_PURCHASE_TRANSACTION,
  CHECKOUT_ERROR,
  CHECKOUT_TIMEOUT } from './actionTypes.js'

const ShopItemsRef = firebase.database().ref('/shopItems/')

export function waitForMilliseconds(milliseconds){
  return dispatch => {
    setTimeout(() => {
      dispatch({
        type: CHECKOUT_TIMEOUT,
        payload: {phase: "timeout"}
      })
    }, milliseconds);
  }
}

export function fetchShopItems() {
  var list = []
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
        payload: {items: list}
      })
    })
  }
}

export function addToCart(item){
  return dispatch => { dispatch ({
    type: ADD_TO_CART,
    payload: {cart: item}
    })
  }
}

export function checkoutError(error){
  return dispatch => {
    dispatch({
      type: CHECKOUT_ERROR,
      payload: {error: {code: 30, message: "Checkout error: " + error.toString()}}
    })
  }
}

export function removeShopItem(key) {
  return dispatch => ShopItemsRef.child(key).remove()
}

export function getClientTokenFromBraintree(){
  return dispatch => {
    dispatch({
      type: START_CHECKOUT_FLOW,
      payload: {phase: "start"}
    })
    let JOOGAURL = typeof(JOOGASERVER) === "undefined" ? 'http://localhost:3000/clientToken' : JOOGASERVER+'/clientToken'
    console.log("JOOGASERVER: ", JOOGASERVER);
    console.log("JOOGAURL: ", JOOGAURL);
    firebase.auth().currentUser.getToken(true)
    .then( idToken => {
      return axios.get(JOOGAURL + '?token=' + idToken)
    })
    .then( response => {
      dispatch({
        type: GET_CLIENT_TOKEN,
        payload: {token: response.data, phase: "tokenReceived"}
      })
    })
    .catch( error => {
        console.error("TOKEN_ERROR:", error);
        dispatch({
          type: CHECKOUT_ERROR,
          payload: {error: {code: 10, message: "ClientToken error: " + error.toString()}}
        })
    });
  }
}

export function doPurchaseTransaction(nonce, clientKey) {
  return dispatch => {
    let JOOGAURL = typeof(JOOGASERVER) === "undefined" ? 'http://localhost:3000/checkout' : JOOGASERVER+'/checkout'
    console.log("JOOGASERVER: ", JOOGASERVER);
    console.log("JOOGAURL: ", JOOGAURL);

    firebase.auth().currentUser.getToken(true)
    .then( idToken => {
      return axios.post(JOOGAURL,
        {
          payment_method_nonce: nonce,
          item_key: clientKey,
          current_user: idToken
        })
    })
    .then( result => {
      dispatch({
        type: DO_PURCHASE_TRANSACTION,
        payload: { cart: {}, phase: "done", purchaseResult: result, error: {code: 0, message: "no error"} }
      })
    })
    .catch( error => {
      console.error("PURCHASE ERROR",error);
      dispatch({
        type: CHECKOUT_ERROR,
        payload: {error: {code: 20, message: "ClientToken error: " + error.toString()}}
      })
    })
  }
}
