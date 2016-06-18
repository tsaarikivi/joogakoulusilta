import React from "react";

import ShopItem from "./ShopItem.jsx"
import {addShopItem} from "../../actions/storeActions.js"

export default class ShopList extends React.Component {
  componentWillMount() {
    const { store } = this.props;
    const { database } = this.props

    this.unsubscribe = store.subscribe(() => this.forceUpdate());

    var specialCoursesReffi = database.ref('/specialCourses');

    store.dispatch(() => {
      specialCoursesReffi.on('value', snapshot => {

        snapshot.forEach(function(data) {
          store.dispatch(addShopItem(data.val().title, data.val().desc, data.key))
        });

      })
    })
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  newItem() {
    this.props.store.dispatch(addShopItem("titteli", "desci", "100"))
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

  getItems() {

    let items = [];

    let state = this.props.store.getState();

    state.shopItems.forEach(function(storeItem) {
      items.push(
        <ShopItem title={storeItem.title} desc={storeItem.desc} price={storeItem.price} itemId={"10"}/>
      );
    });

    return items;
  }
}
