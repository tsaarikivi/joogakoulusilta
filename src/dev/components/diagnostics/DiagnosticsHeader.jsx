import React from "react";
import { Link } from "react-router"

export default class DiagnosticsHeader extends React.Component {
  render() {
    return (
      <div class="container light-bg">
        <div className="content-container">
          <Link className="text-link back-btn" to="admin">&lt;Takaisin</Link>
          <h1>Diagnostiikkasivu</h1>
        </div>
      </div>
    );
  }
}
