import React from "react";
import { Link } from "react-router"

export default class Register extends React.Component {
  render() {
    return (
      <div class="container">
        <h1>Rekisteröidy</h1>
        <form>
          <label>Etunimi</label>
          <input type="text" />
          <br/>
          <label>Sukunimi</label>
          <input type="text" />
          <br/>
          <label>Sähköposti</label>
          <input type="text" />
          <br/>
          <label>Salasana</label>
          <input type="text" />
          <br/>
          <Link className="btn-small login-btn" to="user">Rekisteröidy</Link>
        </form>
      </div>
    );
  }
}
