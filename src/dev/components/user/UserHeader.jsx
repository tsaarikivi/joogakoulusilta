import React from "react";
import { Link } from "react-router"

export default class UserHeader extends React.Component {

  constructor(){
    super();
    this.aikaLoppuu = new Date();
    this.onkoAikaa = false;
    this.count = 0;
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.curUsr.transactions.time != 0){
      this.aikaLoppuu.setTime(nextProps.curUsr.transactions.time);
      this.onkoAikaa = true;
    }
    this.count = nextProps.curUsr.transactions.count;
    console.log("HEADER: ", nextProps, this.onkoAikaa, this.aikaLoppuu);
  }

  render() {

    if(this.onkoAikaa){
      return (
        <div class="container">
          <h1>Hei, {this.props.curUsr.email}!</h1>
          <h2>Sinulla on <span class="use-times">{this.count}</span> joogakertaa käytettävissä</h2>
          <h2>Voit käyttää kurssitarjontaamme <span class="use-times"> {this.aikaLoppuu.toString()} </span> asti.</h2>
          <Link className="text-link" to="shop">Kauppaan</Link>
        </div>
      );
    }else{
      return (
        <div class="container">
          <h1>Hei, {this.props.curUsr.email}!</h1>
          <h2>Sinulla on <span class="use-times">{this.count}</span> joogakertaa käytettävissä</h2>
          <h2>Sinulla ei ole aikaa.</h2>
          <Link className="text-link" to="shop">Kauppaan</Link>
        </div>
      );
    }
  }
}
