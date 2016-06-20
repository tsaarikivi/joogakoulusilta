import firebase from "firebase"
import thunk from 'redux-thunk'

var config = {
  apiKey: "AIzaSyCq544Yq7EEY-5spIe1oFCe8gkOzRkS5ak",
  authDomain: "joogakoulusilta-projekti.firebaseapp.com",
  databaseURL: "https://joogakoulusilta-projekti.firebaseio.com",
  storageBucket: "joogakoulusilta-projekti.appspot.com",
};
firebase.initializeApp(config);

import { FETCH_SHOP_ITEMS, ADD_SHOP_ITEM, REMOVE_SHOP_ITEM } from './actionTypes.js'

const shopItems = firebase.database().ref('/shopItems/')

export function fetchShopItems() {
  return dispatch => {
    shopItems.on('value', snapshot => {
      dispatch({
        type: FETCH_SHOP_ITEMS,
        payload: snapshot.val()
      })
    })
  }
}

export function addShopItem(title, desc, price) {
  return dispatch => shopItems.push({
    title,
    desc,
    price
  })
}

export function removeShopItem(key) {
  return dispatch => shopItems.child(key).remove()
}
