import React from "react";
import { Link } from "react-router"

export default class User extends React.Component {
  render() {
    return (
      <div>
        <h1>Käyttäjä</h1>
        <Link to="shop">Kauppaan</Link>
      </div>
    );
  }
}
