import React from "react";
import { Link } from "react-router"

export default class ShopItem extends React.Component {
  render() {
    return (
      <li>
        <h3>{this.props.title}</h3>
        <p>{this.props.desc}</p>
        <p class="price">{this.props.price}</p>
        <Link className="btn-small" to="checkout" price={this.props.price}>Osta</Link>
      </li>
    );
  }
}
