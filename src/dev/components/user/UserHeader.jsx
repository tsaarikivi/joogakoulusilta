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

  renderContent() {
    if(this.onkoAikaa){
      return (
        <div>
          <p>Voit käyttää kurssitarjontaamme <span className="use-times"> {this.aikaLoppuu.toString()} </span> asti.</p>
        </div>
      )
    }
    else if(this.count > 0){
      return (
        <div>
          <p>Sinulla on <span className="use-times">{this.count}</span> kertalippua käytettävissä. Ensimmäinen vanhenee <span className="use-times"> {this.firstexpire.toString()} </span>.</p>
        </div>
      )
    } else {
      return (
        <div>
          <p>Sinulla ei ole kertalippuja käytettävissä, eikä aikaa. Käy kaupassamme ostamassa kurssioikeuksia, jos haluat joogaamaan.</p>
        </div>
      )
    }
  }

  render() {
    return (
      <div class="container bordered-container">
        <div className="content-container align-left">
          <h1>Hei, {this.props.curUsr.firstname}!</h1>
          {this.renderContent()}
          <Link className="text-link text-link-white" to="shop">Kauppaan</Link>
        </div>
      </div>
    )
  }

}
