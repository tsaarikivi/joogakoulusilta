import { ADD_SHOP_ITEM, REMOVE_SHOP_ITEM } from './actionTypes.js'

export function addShopItem(title, desc, price) {
  return {
    type: ADD_SHOP_ITEM,
    title,
    desc,
    price,
  }
}

export function removeShopItem(key) {
  return {
    type: REMOVE_SHOP_ITEM,
    key
  }
}
