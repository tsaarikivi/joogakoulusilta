import React from "react";
import { Link } from "react-router"

export default class ShopHeader extends React.Component {
  render() {
    return (
      <div class="container header-container">
        <Link className="text-link back-btn" to="user">&lt;Takaisin</Link>
        <h1>Kauppa</h1>
      </div>
    );
  }
}