import { FETCH_SHOP_ITEMS } from './actionTypes.js'

const ShopItemsRef = firebase.database().ref('/shopItems/')

export function fetchShopItems() {
  var list = []
  return dispatch => {
    ShopItemsRef.on('child_added', snapshot => {
      list = list.concat(snapshot.val())
      dispatch({
        type: FETCH_SHOP_ITEMS,
        payload: list
      })
    })
  }
}

export function addShopItem(title, desc, price) {
  return dispatch => ShopItemsRef.push({
    title,
    desc,
    price
  })
}

export function removeShopItem(key) {
  return dispatch => ShopItemsRef.child(key).remove()
}
