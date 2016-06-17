import React from "react";
import { Link } from "react-router"

export default class HomeLoginRegister extends React.Component {
  render() {
    return (
      <div class="container main-header-container">
        <h1 class="main-heading">Joogakoulu Silta</h1>
        <p class="slogan">Silta joogan maailmaan</p>
        <Link className="text-link" to="info">Tutustu tarkemmin</Link>
      </div>
    );
  }
}
