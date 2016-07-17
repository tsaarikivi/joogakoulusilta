import React from "react";
import { Link } from 'react-router'

export default class ProfileHeader extends React.Component {
  render() {
    var errorData = null;
    if (this.props.userError.code != 0){
      errorData = <p>Error: {this.props.userError.code} {this.props.userError.message}</p>
    }
    return (
      <div class="container bordered-container centered">
        <Link className="btn-small btn-blue btn-left" to="user">Takaisin</Link>
        <h2 className="header-collapse">Käyttäjän hallinnointi.</h2>
        {errorData}
      </div>
    );
  }
}
