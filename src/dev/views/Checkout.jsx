import React from "react";
import { Link } from "react-router"

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import UserList from '../components/admin/UserList.jsx'
import * as actionCreators from '../actions/shop.js'


var Braintree = require("braintree-web");
import DropIn from "../components/shop/BraintreeDropIn.jsx";

class Checkout extends React.Component {

  static contextTypes = {
    router: React.PropTypes.object
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.shopItems.phase === "timeout"){
      this.context.router.push('user');
    }
  }

  componentWillMount(){

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

//=================================================================
//Render logic
//=================================================================

renderCashPayment(){
    return( <UserList /> )
}

  renderStartPhase(){
    return(
      <div>Alustetaan maksuyhteyttä...</div>
    )
  }

  renderDonePhase(){
    this.props.actions.waitForMilliseconds(5*1000);
    return(
      <div>
        <p>Maksu onnistuneesti suoritettu...</p>
        <Link className="btn-small btn-blue" to="shop"> Takaisin kauppaan...</Link>
      </div>
    )
  }

  renderError(){
    return(
      <div>Maksuyhteydessä ongelmia...</div>
    )
  }

  renderPayment(){
    return (
          <div>
            <p className="centered">Valitse maksutapa ja vahvista maksu.</p>
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
              <input type='submit' className="btn-small btn-blue" value='Vahvista!'></input>
            </form>
          </div>
    );
  }

  render() {
    if(this.props.shopItems.error.code != 0){
      return(<p>Error: {this.props.shopItems.error.code} {this.props.shopItems.error.message}</p>)
    }
    switch(this.props.shopItems.phase){
      case "cashPayment":
        return this.renderCashPayment()
      case "braintreePayment":
          return this.renderStartPhase()
      case "tokenReceived":
        return this.renderPayment()
      case "done":
        return this.renderDonePhase()
      case "error":
        return this.renderError()
      case "timeout":
        return(<p> Palataan takaisin päänäkymään.</p>)
      default:
      return (<p>ERROR</p>)
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
