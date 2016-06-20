import React from "react";

import ShopItem from "./ShopItem.jsx"
import { fetchShopItems, addShopItem, removeShopItem } from "../../actions/actionCreators.js"

export default class ShopList extends React.Component {

  constructor(){
    super();
  }

  componentWillMount() {
    const { firebase } = this.props;
    const { store } = this.props;
    this.unsubscribe = store.subscribe(() => this.forceUpdate());
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

    for(var item in state.shopItems){
      items.push(
        <ShopItem
          title={state.shopItems[item].title}
          desc={state.shopItems[item].desc}
          price={state.shopItems[item].price}
          key={item}/>
      )
    }
    return items;
  }
}
