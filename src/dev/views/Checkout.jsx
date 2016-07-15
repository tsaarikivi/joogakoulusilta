import React from "react";
import { Link } from "react-router"

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as actionCreators from '../actions/shop.js'


var Braintree = require("braintree-web");
import DropIn from "../components/shop/BraintreeDropIn.jsx";

class Checkout extends React.Component {

  static contextTypes = {
    router: React.PropTypes.object
  }


  componentWillMount(){
    this.props.actions.getClientTokenFromBraintree();
  }

  onReady() {
      console.log('Drop-In ready');
  }

  onError(err) {
        console.error(err);
        this.props.actions.checkoutError(err);
  }

  onPaymentMethodReceived(payload) {
    this.props.actions.doPurchaseTransaction(payload.nonce, this.props.shopItems.cart.key)
  }



  render() {
    console.log("CHECKOUT_RENDER:", this.props.shopItems);
    if(this.props.shopItems.phase === "") {
      return(
        <div>Alustetaan maksuyhteyttä...</div>
      )
    } else if(this.props.shopItems.phase === "done") {
        return(
          <div>
            <p>Maksu onnistuneesti suoritettu...</p>
            <Link className="btn-small btn-blue" to="shop"> Takaisin kauppaan...</Link>
          </div>
        )
    } else if(this.props.shopItems.phase === "error") {
      return(
        <div>Maksuyhteydessä ongelmia...</div>
      )
    } else {
      return (
            <div>
              <p>Valitse maksutapa ja vahvista maksu.</p>
              <p class='test-instruction' >Testaa: <code>4111 1111 1111 1111</code></p>
              <form action='/transactions' method='POST'>
                  <DropIn
                      braintree={Braintree}
                      clientToken={this.props.shopItems.token}
                      onReady={this.onReady}
                      onError={this.onError}
                      onPaymentMethodReceived={this.onPaymentMethodReceived.bind(this)}
                  />
                <br></br>
                <p>{this.props.shopItems.cart.title}</p><br></br>
                <p>Hinta: {this.props.shopItems.cart.price} € </p>
                <input type='submit' value='Vahvista:'></input>
              </form>
            </div>
      );
    }
  }
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(actionCreators, dispatch) }
}

function mapStateToProps(state) {
  return { shopItems: state.shopItems, currentUser: state.currentUser }
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout)
