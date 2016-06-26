import React from "react";
import { Link } from "react-router"

export default class Login extends React.Component {
  render() {
    return (
      <div class="container">
        <form>
          <h1>Kirjaudu sisään</h1>
            <label>Sähköposti</label>
            <input id="email" type="email" name="email" placeholder="Sähköposti"/>
            <label>Salasana</label>
            <input id="password" type="password" name="password" placeholder="Salasana"/>
          <br/>
          <button className="btn-small login-btn">Kirjaudu</button>
        </form>
      </div>
    );
  }
}
