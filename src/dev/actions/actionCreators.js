import firebase from "firebase"
import thunk from 'redux-thunk'

import { FETCH_SHOP_ITEMS, ADD_SHOP_ITEM, REMOVE_SHOP_ITEM } from './actionTypes.js'



export function fetchShopItems(storeRef, databaseRef) {
  console.log("in fetchShopItems");
  storeRef.dispatch(() => {
    databaseRef.on('value', snapshot => {
      console.log("fetchShopItems: snapshot.val()");
      console.log(snapshot.val());
      storeRef.dispatch({
        type: FETCH_SHOP_ITEMS,
        payload: snapshot.val()
      })
    })
  })
}

export function addShopItem(databaseRef,title, desc, price) {
  return databaseRef.push({ title, desc, price })
}

export function removeShopItem(databaseRef,key) {
  return databaseRef.child(key).remove()
}
