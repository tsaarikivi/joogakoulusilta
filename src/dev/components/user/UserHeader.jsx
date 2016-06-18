import React from "react";
import { Link } from "react-router"

export default class UserHeader extends React.Component {
  render() {
    return (
      <div class="container">
        <h1>Hei, Käyttäjä!</h1>
        <h2>Sinulla on <span class="use-times">8</span> joogakertaa käytettävissä</h2>
        <Link className="text-link" to="shop">Kauppaan</Link>
      </div>
    );
  }
}
