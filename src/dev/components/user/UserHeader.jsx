import React from "react";
import { Link } from "react-router"

export default class UserHeader extends React.Component {

  constructor(){
    super();
  }

  render() {
    return (
      <div class="container">
        <h1>Hei, {this.props.curUsr.email}!</h1>
        <h2>Sinulla on <span class="use-times">{this.props.curUsr.tokens.usetimes}</span> joogakertaa käytettävissä</h2>
        <Link className="text-link" to="shop">Kauppaan</Link>
      </div>
    );
  }
}
