import React from "react";
import { Link } from "react-router"

export default class UserHeader extends React.Component {

  constructor(){
    super();
    this.aikaLoppuu = new Date();
    this.onkoAikaa = false;
    this.count = 0;
    this.firstexpire = new Date();
  }

  componentWillMount(){
    if(this.props.curUsr.transactions.time != 0){
      this.aikaLoppuu.setTime(this.props.curUsr.transactions.time);
      this.onkoAikaa = true;
    }
    this.count = this.props.curUsr.transactions.count;
    this.firstexpire.setTime(this.props.curUsr.transactions.firstexpire);
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.curUsr.transactions.time != 0){
      this.aikaLoppuu.setTime(nextProps.curUsr.transactions.time);
      this.onkoAikaa = true;
    }
    this.count = nextProps.curUsr.transactions.count;
    this.firstexpire.setTime(nextProps.curUsr.transactions.firstexpire);
  }

  render() {

    if(this.onkoAikaa){
      return (
        <div class="container">
          <h1>Hei, {this.props.curUsr.email}!</h1>
          <h2>Voit käyttää kurssitarjontaamme <span class="use-times"> {this.aikaLoppuu.toString()} </span> asti.</h2>
          <Link className="text-link" to="shop">Kauppaan</Link>
        </div>
      );
    }
      if(this.count > 0){
        return (
        <div class="container">
          <h1>Hei, {this.props.curUsr.email}!</h1>
          <h2>Sinulla on <span class="use-times">{this.count}</span> kertalippua käytettävissä</h2>
          <h2>Ensimmäinen vanhenee <span class="use-times"> {this.firstexpire.toString()} </span>.</h2>
          <Link className="text-link" to="shop">Kauppaan</Link>
        </div>
      );
    } else {
      return (
        <div class="container">
          <h1>Hei, {this.props.curUsr.email}!</h1>
          <h2>Sinulla on ei ole kertalippuja käytettävissä, eikä aikaa.</h2>
          <h2>Käy kaupassamme ostamassa kurssioikeuksia, jos haluat joogaamaan.</h2>
          <Link className="text-link" to="shop">Kauppaan</Link>
        </div>
      );
    }
  }
}
