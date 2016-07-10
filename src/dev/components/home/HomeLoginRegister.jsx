import React from "react";
import { Link } from "react-router"

export default class HomeLoginRegister extends React.Component {
  render() {
    return (
      <div class="container login-container">
        <h2 class="login-heading">Oletko jo jäsen?</h2>
        <Link className="btn-small btn-blue" to="login">Kirjaudu</Link>
        <Link className="btn-small btn-white" to="register">Tai rekisteröidy</Link>
      </div>
    );
  }
}
