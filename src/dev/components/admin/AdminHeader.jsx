import React from "react";
import { Link } from "react-router"

export default class AdminHeader extends React.Component {
  render() {
    return (
      <div class="container light-bg">
        <div className="content-container">
          <Link className="text-link back-btn" to="user">&lt;Takaisin</Link>
          <Link className="text-link text-link-white" to="diagnostics">Diagnostiikkaa</Link>
          <h1>Hallinnointisivu</h1>
        </div>
      </div>
    );
  }
}
