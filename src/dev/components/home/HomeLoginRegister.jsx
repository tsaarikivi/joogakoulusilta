import React from "react";
import { Link } from "react-router"

export default class HomeLoginRegister extends React.Component {
  render() {
    return (
      <div class="container login-container">
        <h2 class="login-heading">Oletko jo jäsen?</h2>
        <Link className="btn-small login-btn btn-blue" to="login">Kirjaudu</Link>
        <Link className="btn-small register-btn btn-blue" to="register">Tai rekisteröidy</Link>
      </div>
    );
  }
}
