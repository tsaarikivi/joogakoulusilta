import React from "react";

import ShopItem from "./ShopItem.jsx"
import { fetchShopItems, addShopItem, removeShopItem } from "../../actions/actionCreators.js"

export default class ShopList extends React.Component {

  componentWillMount() {
    fetchShopItems()
  }

  render() {
    return (
      <div class="container shop-list-container">
        <button onClick={() => this.newItem()}>buttoni</button>
        <ul class="shop-list">
          {this.getItems()}
        </ul>
      </div>
    );
  }

  newItem() {
    addShopItem("titteli", "desci", "100")
  }

  getItems() {
    let items = [];
    let state = this.props.store.getState();
    let nextId = 0;

    console.log(state);

    state.shopItems.forEach(function(item) {
      items.push(
        <ShopItem title={item.title} desc={item.desc} price={item.price} itemId={nextId}/>
      );
      nextId += 1
    });

    return items;
  }
}
