import { FETCH_SHOP_ITEMS, ADD_TO_CART_AND_CHECKOUT } from './actionTypes.js'

const ShopItemsRef = firebase.database().ref('/shopItems/')

export function fetchShopItems() {
  var list = []
  return dispatch => {
    ShopItemsRef.orderByChild('price').on('child_added', snapshot => {
      let shopItemWithKey = snapshot.val();
      shopItemWithKey.key = snapshot.key;
      list = list.concat(shopItemWithKey);
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


export function addShopItem(title, desc, price, token) {
  return dispatch => ShopItemsRef.push({
    title: title,
    desc: desc,
    price: price,
    token: token
  })
}

export function removeShopItem(key) {
  return dispatch => ShopItemsRef.child(key).remove()
}
