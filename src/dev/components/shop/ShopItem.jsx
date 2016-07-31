import React from "react";
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as actionCreators from '../../actions/shop.js'

class ShopItem extends React.Component {

  static contextTypes = {
    router: React.PropTypes.object
  }

  payTrailPurchase(){
    const { item } = this.props
    this.props.actions.addToCart(item);
    this.props.actions.initializePayTrailTransaction(item.key, item.type)
    this.context.router.push('checkout');

  }

  cashPurchase(){
    this.props.actions.addToCart(this.props.item);
    this.props.actions.buyWithCash();
    this.context.router.push('checkout');

  }

  renderExpire() {
    if (this.props.item.type === "count") {
      return (
        <p className="item-expiration">Käyttöaikaa {this.props.item.expiresAfterDays} päivää</p>
      )
    }
    else {
      return (
        <div></div>
      )
    }
  }

  render() {
    let cashBuyButton = null;
    const { admin, instructor } = this.props.roles;
    if(admin || instructor){
      cashBuyButton = <button className="btn-small btn-blue" onClick={this.cashPurchase.bind(this)} >Käteisosto</button>
    }
    return (
      <li>
        <h3 className="item-title">{this.props.item.title}</h3>
        <p className="item-desc">{this.props.item.desc}</p>
        {this.renderExpire()}
        <p class="item-price">{this.props.item.price} €</p>        
        <span className="item-row">
          {cashBuyButton}
        </span>
        <span className="item-row">
          <button className="btn-small btn-blue btn-link" onClick={this.payTrailPurchase.bind(this)} >Osta</button>
        </span>
      </li>
    );
  }
}


function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(actionCreators, dispatch) }
}

export default connect(null, mapDispatchToProps)(ShopItem)
