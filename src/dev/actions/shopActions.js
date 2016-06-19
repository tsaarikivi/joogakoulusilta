export const ADD_SHOP_ITEM = 'ADD_SHOP_ITEM'

export function addShopItem(title, desc, price) {
  return {
    type: ADD_SHOP_ITEM,
    title,
    desc,
    price,
  }
}
