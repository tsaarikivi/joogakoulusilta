import React from "react";

import ShopItem from "./ShopItem.jsx"

export default class ShopList extends React.Component {
  render() {
    return (
      <div class="container shop-list-container">
        <ul class="shop-list">
          {this.getItems()}
        </ul>
      </div>
    );
  }

  getItems() {
    var items = [
      <ShopItem title={"2 joogakertaa"} desc={"Käyttöoikeus säilyy 8 viikon ajan"} price={"20 €"} itemId={"Item-id"}/>,
      <ShopItem title={"6 joogakertaa"} desc={"Käyttöoikeus säilyy 8 viikon ajan"} price={"50 €"} itemId={"Item-id"}/>,
      <ShopItem title={"15 joogakertaa"} desc={"Käyttöoikeus säilyy 8 viikon ajan"} price={"100 €"} itemId={"Item-id"}/>
    ];
    return items;
  }
}
