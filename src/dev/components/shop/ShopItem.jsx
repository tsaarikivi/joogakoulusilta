import React from "react";
import { Link } from "react-router"
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as actionCreators from '../../actions/shop.js'

class ShopItem extends React.Component {

  static contextTypes = {
    router: React.PropTypes.object
  }

  handleClick(e){
    e.preventDefault();
    console.log("EVENT:: ",e);
    this.props.actions.addToCart(this.props.item);
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
    return (
      <li>
        <h3 className="item-title">{this.props.item.title}</h3>
        <p className="item-desc">{this.props.item.desc}</p>
        {this.renderExpire()}
        <p class="item-price">{this.props.item.price} €</p>
        <Link className="btn-small btn-blue" to="checkout" onClick={this.handleClick.bind(this)} >Osta</Link>
      </li>
    );
  }
}


function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(actionCreators, dispatch) }
}

export default connect(null, mapDispatchToProps)(ShopItem)
