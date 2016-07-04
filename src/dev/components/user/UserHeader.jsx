import React from "react";
import { Link } from "react-router"

export default class UserHeader extends React.Component {

  constructor(){
    super();
    this.usetimes = "0";
    this.email = "x"
  }

  componentWillReceiveProps(nextProps){
    console.log("USERHEADERNEXTPROPS",nextProps)
    this.usetimes = nextProps.curUsr.tokens.usetimes;
    console.log(this.usetimes);
    this.email = nextProps.curUsr.email;
    console.log(this.email);
  }

  render() {
    return (
      <div class="container">
        <h1>Hei, {this.email}!</h1>
        <h2>Sinulla on <span class="use-times">{this.usetimes}</span> joogakertaa käytettävissä</h2>
        <Link className="text-link" to="shop">Kauppaan</Link>
      </div>
    );
  }
}
