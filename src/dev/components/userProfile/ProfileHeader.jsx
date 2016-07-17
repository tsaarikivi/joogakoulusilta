import React from "react";
import { Link } from 'react-router'

export default class ProfileHeader extends React.Component {
  render() {
    var errorData = null;
    if (this.props.userError.code != 0){
      errorData = <p>Error: {this.props.userError.code} {this.props.userError.message}</p>
    }
    return (
      <div class="container bordered-container">
        <div className="content-container">
        <Link className="text-link back-btn" to="user">&lt;Takaisin</Link>
        <h1>Käyttäjän hallinnointi.</h1>
        {errorData}
        </div>
      </div>
    );
  }
}
