import React from "react";
import { Link } from "react-router"

export default class Home extends React.Component {
  render() {
    return (
      <div>
        <h1>Moi</h1>
        <Link to="info">Lue lisää</Link>
        <Link to="user">Kirjaudu</Link>
      </div>
    );
  }
}
