import React from "react";
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as actionCreators from '../../actions/shop.js'

class ShopItem extends React.Component {

  constructor(){
    super();
    this.onceOnly = false;
  }

  static contextTypes = {
    router: React.PropTypes.object
  }

  componentDidMount(){
    this.onceOnly = false;
  }

  payTrailPurchase(){
    const { item } = this.props
    if(!this.onceOnly){
      this.onceOnly = true;
      this.props.actions.addToCart(item);
      this.props.actions.initializePayTrailTransaction(item.key, item.type)
      this.context.router.push('checkout');
    }
  }

  cashPurchase(){
    if(!this.onceOnly){
      this.onceOnly = true;
      this.props.actions.addToCart(this.props.item);
      this.props.actions.buyWithCash();
      this.context.router.push('checkout');
    }
  }

  renderExpire() {
    if (this.props.item.type === "count") {
      return (
        <p className="text-fade nomargin nopadding">Käyttöaikaa {this.props.item.expiresAfterDays} päivää</p>
      )
    }
    else {
      return (
        <p className="text-fade nomargin nopadding">Käyttöaikaa {this.props.item.usedays} päivää</p>
      )
    }
  }

  renderIsOnce() {
    if (this.props.item.oneTime) {
      return <p className="text-fade margin-bottom nopadding">Voit ostaa tämän tuotteen vain kerran</p>
    } else {
      return <div></div>
    }
  }



/*
-------Laita tämä {cashBuyButton} yläpuolelle
      <span className="item-row">
                <button className="btn-small btn-blue mobile-full" onClick={this.payTrailPurchase.bind(this)} >Osta</button>
      </span>
*/

  renderBuyButtons(){

    let cashBuyButton = null;
    const { admin, instructor } = this.props.roles;
    if(admin || instructor){
      cashBuyButton = <button className="btn-small btn-blue mobile-full margin-top" onClick={this.cashPurchase.bind(this)} >Käteisosto</button>
    }
    return(
      <div>
        <span className="item-row">
          {cashBuyButton}
        </span>
      </div>
    )
  }

  render() {
    return (
      <li>
        <p className="item-title margin-bottom nopadding text-bold">{this.props.item.title}</p>
        <p className="item-desc nomargin nopadding">{this.props.item.desc}</p>
        {this.renderExpire()}
        <p class="item-price text-blue text-bold margin-top nopadding">{this.props.item.price} €</p>
        {this.renderIsOnce()}
        {this.renderBuyButtons()}
      </li>
    );
  }
}


function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(actionCreators, dispatch) }
}

export default connect(null, mapDispatchToProps)(ShopItem)
