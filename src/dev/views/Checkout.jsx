import React from "react";
import { Link } from "react-router"
var md5 = require('md5')
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import UserList from '../components/admin/UserList.jsx'
import * as actionCreators from '../actions/shop.js'


var Braintree = require("braintree-web");
import DropIn from "../components/shop/BraintreeDropIn.jsx";

class Checkout extends React.Component {

  constructor(){
    super()
    this.paymentOngoing = false;
    this.buyingSpecialCourse = false;
    this.widgetInitialized = false;
    this.finishingPayTrailOngoing = false;
  }

  static contextTypes = {
    router: React.PropTypes.object
  }

  componentWillReceiveProps(nextProps){
    console.log("CHECKOUT-NEXT-PROPS: ", nextProps);
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

  completePayTrailPayment(){
    if(this.props.shopItems.phase === "payTrailPayment"){
      SV.widget.initWithForm('payment', {charset:'ISO-8859-1'});
    }
  }

  renderSubmitPayTrail(){
    this.finishingPayTrailOngoing = false;
    return(
      <div>
        <button className="btn-small btn-blue" onClick={() => this.props.actions.buyWithPaytrail(this.props.shopItems.initializedTransaction)}>Siirry maksamaan</button>
        <button className="btn-small btn-blue" onClick={() => this.props.actions.cancelPaytrailPayment(this.props.shopItems.initializedTransaction)}>Peru osto</button>
      </div>
    )
  }

  renderPayTrail(){
    const { cart, initializedTransaction, authCode } = this.props.shopItems
    let merchantId = "13466"
    let amount = cart.price;
    let orderNumber = initializedTransaction
    let referenceNumber = ""
    let orderDescription = cart.key;
    let currency = "EUR"
    let returnAddress = "https://joogakoulusilta-projekti.firebaseapp.com/#/checkout"
    let cancelAddress = "https://joogakoulusilta-projekti.firebaseapp.com/#/checkout"
    let pendingAddress = ""
    let notifyAddress = "http://joogaserver-stage.herokuapp.com/paytrailnotification"
    let type = "S1"
    let culture = "fi_FI"
    let preselectedMethod = ""
    let mode = "1"
    let visibleMethods = ""
    let group = ""
    let _authcode = merchantId + '|' + amount + '|' + orderNumber + '|' + referenceNumber + '|' + orderDescription + '|' + currency + '|' + returnAddress + '|' + cancelAddress + '|' + pendingAddress + '|' + notifyAddress + '|' + type + '|' + culture + '|' + preselectedMethod + '|' + mode + '|' + visibleMethods + '|' + group;
    let merchantAuthenticationhash = "6pKF4jkv97zmqBJ3ZL8gUw5DfT2NMQ";
    console.log("REFERENCE: ", md5(merchantAuthenticationhash + '|' + _authcode).toUpperCase());
    console.log("AUTHCODE: ", authCode);
    if(authCode ===""){
      setTimeout(() => {
        this.props.actions.getAuthCode(_authcode)
      }, 500)
      
      return(<div></div>)
    }

    if(!this.widgetInitialized){
      this.widgetInitialized = true;
      setTimeout(() => {
        SV.widget.initWithForm('payment', {charset:'UTF-8'});
      }, 1000)
    }
    return(
      <form id="payment">
        <input name="MERCHANT_ID" type="hidden" value={merchantId}/>
        <input name="AMOUNT" type="hidden" value={amount}/>
        <input name="ORDER_NUMBER" type="hidden" value={orderNumber}/>
        <input name="REFERENCE_NUMBER" type="hidden" value={referenceNumber}/>
        <input name="ORDER_DESCRIPTION" type="hidden" value={orderDescription}/>
        <input name="CURRENCY" type="hidden" value={currency}/>
        <input name="RETURN_ADDRESS" type="hidden" value={returnAddress}/>
        <input name="CANCEL_ADDRESS" type="hidden" value={cancelAddress}/>
        <input name="PENDING_ADDRESS" type="hidden" value={pendingAddress}/>
        <input name="NOTIFY_ADDRESS" type="hidden" value={notifyAddress}/>
        <input name="TYPE" type="hidden" value={type}/>
        <input name="CULTURE" type="hidden" value={culture}/>
        <input name="PRESELECTED_METHOD" type="hidden" value={preselectedMethod}/>
        <input name="MODE" type="hidden" value={mode}/>
        <input name="VISIBLE_METHODS" type="hidden" value={visibleMethods}/>
        <input name="GROUP" type="hidden" value={group}/>
        <input name="AUTHCODE" type="hidden" value={authCode}/>
      </form>

    )
  }

  renderStart(){
    if(this.props.location.search === ""){ //This should not really happen. Something has failed, and let's get user back to the user view.
      //setTimeout(() => { this.context.router.push('user')}, 2000)
      return(<Link className="text-link back-btn" to="user">&lt;Takaisin</Link>)
    }
    //We assume redirection from the PayTrail with details in the query object
    if(this.props.auth.uid){ //Wait for re-authentication as this is a redirect from the PayTrail.
      if(!this.finishingPayTrailOngoing){
        this.finishingPayTrailOngoing = true;
        console.log("RENDERSTART: goint to finish: ", this.props.location.query, this.props.auth);
        setTimeout(() => {
          this.props.actions.finishPayTrailTransaction(this.props.location.query);
        }, 500)
      }
    }
    console.log("WHAT-TO-RENDER??? ", this.props); 
    return(<div></div>)
  }


  componentWillUnmount(){
    console.log("CHECKOUT UNMOUNTED - SHOPRESET");
    this.props.actions.resetShop()
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
    <div>
      <button className="btn-small btn-blue" onClick={() => this.props.actions.resetShop()} > Peru osto </button>
      <h3 className="centered"> Valitse käyttäjä, jolle osto suoritetaan.</h3>
      <UserList />
    </div>   
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
          <div>
            <h2 className="centered">Valitse maksutapa ja vahvista maksu.</h2>
            <form action='/transactions' method='POST'>
                <DropIn
                    braintree={Braintree}
                    clientToken={this.props.shopItems.token}
                    onReady={this.onReady.bind(this)}
                    onError={this.onError.bind(this)}
                    onPaymentMethodReceived={this.onPaymentMethodReceived.bind(this)}
                />
              <br></br>
              <p>{this.props.shopItems.cart.title}</p><br></br>
              <p>Hinta: {this.props.shopItems.cart.price} € </p>
              <input type='submit' id="submitButton" disabled='true' className="btn-small btn-blue" value='Vahvista!'></input>
            </form>
          </div>
    );
  }

  render() {
        console.log("CHECKOUT-RENDER-PROPS: ", this.props);

    switch(this.props.shopItems.phase){
      case "payTrailInitialized":
        return this.renderSubmitPayTrail()
      case "payTrailPayment":
        return this.renderPayTrail()
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
