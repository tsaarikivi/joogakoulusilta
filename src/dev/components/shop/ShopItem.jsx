import React from "react";

export default class ShopItem extends React.Component {
  render() {
    return (
      <li>
        <h3>{this.props.title}</h3>
        <p>{this.props.desc}</p>
        <p class="price">{this.props.price}</p>
        <button class="btn-small">Osta</button>
      </li>
    );
  }
}
