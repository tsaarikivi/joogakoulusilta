import React from "react";

import ShopItem from "./ShopItem.jsx"
import { fetchShopItems, addShopItem, removeShopItem } from "../../actions/actionCreators.js"

export default class ShopList extends React.Component {

  constructor(){
    super();
  }

  componentWillMount() {
    console.log("Calling fetchShopItems");
    const { firebase } = this.props;
    const { store } = this.props;
    console.log(firebase);
    fetchShopItems(store, firebase.database().ref('/shopItems/'))
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
    const { firebase } = this.props;
    addShopItem(firebase.database().ref('/shopItems/'), "titteli", "desci", "100")
  }

  getItems() {
    const { store } = this.props;
    let items = [];
    let state = store.getState();
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
