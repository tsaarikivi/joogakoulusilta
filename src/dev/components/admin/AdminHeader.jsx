import React from "react";
import { Link } from "react-router"

export default class AdminHeader extends React.Component {
  render() {
    return (
      <div class="container header-container">
        <div className="content-container">
          <Link className="text-link text-link-white float-right" to="diagnostics">Diagnostiikkaa</Link>
          <h1>Hallinnointisivu</h1>
        </div>
      </div>
    );
  }
}
