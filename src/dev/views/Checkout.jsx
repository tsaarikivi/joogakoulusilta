import React from "react";
import { Link } from "react-router"
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as actionCreators from '../actions/shop.js'
import SubmitPayTrail from "../components/checkout/SubmitPayTrail.jsx"
import PayTrail from "../components/checkout/PayTrail.jsx"
import CashPayment from "../components/checkout/CashPayment.jsx"
import BraintreePayment from "../components/checkout/BraintreePayment.jsx"

class Checkout extends React.Component {
  
  static contextTypes = {
    router: React.PropTypes.object
  }

  constructor(){
    super()
    this.paymentOngoing = false;
    this.buyingSpecialCourse = false;
    this.widgetInitialized = false;
    this.finishingPayTrailOngoing = false;
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.shopItems.cart.type){
      if(nextProps.shopItems.cart.type === "special"){
        this.buyingSpecialCourse = true
      } else {
        this.buyingSpecialCourse = false
      }
    }
    if(nextProps.shopItems.phase === "timeout"){
      this.context.router.push('user');
    }
  }

  componentWillUnmount(){
    this.props.actions.resetShop()
  }

  completePayTrailPayment(){
    if(this.props.shopItems.phase === "payTrailPayment"){
      SV.widget.initWithForm('payment', {charset:'ISO-8859-1'});
    }
  }

  renderSubmitPayTrail(){
    this.finishingPayTrailOngoing = false;
    return(
      <SubmitPayTrail actions={this.props.actions} initializedTransaction={this.props.shopItems.initializedTransaction} />
    )
  }

  renderPayTrail(){
    if(!this.widgetInitialized){
      this.widgetInitialized = true;
      setTimeout(() => {
        SV.widget.initWithForm('payment', {charset:'UTF-8'});
      }, 1000)
    }
    return (
      <PayTrail shopItems={this.props.shopItems} actions={this.props.actions} />
    )
  }

  renderStart(){
    if(this.props.location.search === ""){ //This should not really happen. Something has failed, and let's get user back to the user view.
      return(<Link className="text-link back-btn" to="user">&lt;Takaisin</Link>)
    }
    //We assume redirection from the PayTrail with details in the query object
    if(this.props.auth.uid){ //Wait for re-authentication as this is a redirect from the PayTrail.
      if(!this.finishingPayTrailOngoing){
        this.finishingPayTrailOngoing = true;
        setTimeout(() => {
          this.props.actions.finishPayTrailTransaction(this.props.location.query);
        }, 500)
      }
    }
    return(<div></div>)
  }

  onReady() {
      document.getElementById("submitButton").disabled = false;
  }

  onError(err) {
        //Drop-in error. Transient. No action.
        console.error(err);
  }

  onPaymentMethodReceived(payload) {
    if(!this.paymentOngoing){
      this.paymentOngoing = true;
      this.props.actions.doPurchaseTransaction(payload.nonce, this.props.shopItems.cart.key, this.props.shopItems.cart.type)
    }
  }

//=================================================================
//Render logic
//=================================================================

renderCashPayment(){
    return( 
      <CashPayment actions={this.props.actions} />
    )
}

  renderBtPaymentPhase(){
    return(
      <div>
        <h2 className="centered">Alustetaan maksuyhteyttä...</h2>
      </div>
    )
  }

  renderDonePhase(){
    if(this.buyingSpecialCourse){
      this.props.actions.waitForMilliseconds(300); //Set this to define how long the done phase is displayed 
      return(
        <div>
        </div>
      )
    }
    this.props.actions.waitForMilliseconds(300);
    return(
      <div>
      </div>
    )
  }

  renderError(){
    return(
      <div>
        <h2 className="centered">Maksuyhteydessä ongelmia...</h2>
      </div>
    )
  }

  renderPayment(){
    return (
      <BraintreePayment 
        shopItems={this.props.shopItems}
        onReady={this.onReady.bind(this)}
        onError={this.onError.bind(this)}
        onPaymentMethodReceived={this.onPaymentMethodReceived.bind(this)}
      />
    );
  }

  renderPayTrailComplete(){
    setTimeout(() => {this.context.router.push('user')}, 200)
    return(<div></div>)
  }

  render() {

    switch(this.props.shopItems.phase){
      case "payTrailInitialized":
        return this.renderSubmitPayTrail()
      case "payTrailPayment":
        return this.renderPayTrail()
      case "payTrailComplete":
        return this.renderPayTrailComplete()
      case "cashPayment":
        return this.renderCashPayment()
      case "braintreePayment":
          this.paymentOngoing = false;
          return this.renderBtPaymentPhase()
      case "tokenReceived":
        return this.renderPayment()
      case "done":
        return this.renderDonePhase()
      case "error":
        return this.renderError()
      case "timeout":
        return(<p> Palataan takaisin päänäkymään.</p>)
      case "start":
        return this.renderStart()
      default:
      return (<p>ERROR</p>)
    }
  }
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(actionCreators, dispatch) }
}

function mapStateToProps(state) {
  return { auth: state.auth, shopItems: state.shopItems, currentUser: state.currentUser }
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout)
