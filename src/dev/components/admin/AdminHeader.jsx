import React from "react";
import { Link } from "react-router"

export default class AdminHeader extends React.Component {
  render() {
    return (
      <div class="container bordered-container centered">
        <h1>Hallinnointisivu</h1>
        <Link className="text-link back-btn" to="user">&lt;Takaisin</Link>
      </div>
    );
  }
}
