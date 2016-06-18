import React from "react";
import { Link } from "react-router"

export default class Login extends React.Component {
  render() {
    return (
      <div class="container">
        <h1>Kirjaudu sisään</h1>
        <form>
          <label>Sähköposti</label>
          <input type="text" />
          <br/>
          <label>Salasana</label>
          <input type="text" />
          <br/>
          <Link className="btn-small login-btn" to="user">Kirjaudu</Link>
        </form>
      </div>
    );
  }
}
