import React from "react";
import { Link } from "react-router"

export default class ShopItem extends React.Component {
  render() {
    return (
      <li>
        <h3>{this.props.item.title}</h3>
        <p>{this.props.item.desc}</p>
        <p class="price">{this.props.item.price}</p>
        <Link className="btn-small" to="checkout" price={this.props.item.price}>Osta</Link>
      </li>
    );
  }
}
