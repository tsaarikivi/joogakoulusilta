import React from "react";

import ShopItem from "./ShopItem.jsx"

export default class ShopList extends React.Component {
  render() {
    return (
      <div class="container shop-list-container">
        <purchase/>
        <ul class="shop-list">
          {this.getItems()}
        </ul>
      </div>
    );
  }

  getItems() {
    var items = [
      <ShopItem key={1} title={"2 joogakertaa"} desc={"Käyttöoikeus säilyy 100 päivän ajan"} price={"20 €"} itemId={"0"}/>,
      <ShopItem key={2} title={"6 joogakertaa"} desc={"Käyttöoikeus säilyy 100 päivän ajan"} price={"50 €"} itemId={"1"}/>,
      <ShopItem key={3} title={"15 joogakertaa"} desc={"Käyttöoikeus säilyy 100 päivän ajan"} price={"100 €"} itemId={"2"}/>,
      <ShopItem key={4} title={"1 kuukausi"} desc={""} price={"30 €"} itemId={"3"}/>,
      <ShopItem key={5} title={"6 kuukautta"} desc={""} price={"130 €"} itemId={"4"}/>
    ];
    return items;
  }
}
