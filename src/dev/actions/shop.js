import { FETCH_SHOP_ITEMS, ADD_TO_CART_AND_CHECKOUT } from './actionTypes.js'

console.log("GLOBAL: ", global);
const ShopItemsRef = firebase.database().ref('/shopItems/')

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
        payload: list
      })
    })
  }
}

export function addToCart(item){
  return dispatch => { dispatch ({
    type: ADD_TO_CART_AND_CHECKOUT,
    payload: item
    })
  }
}

export function removeShopItem(key) {
  return dispatch => ShopItemsRef.child(key).remove()
}
