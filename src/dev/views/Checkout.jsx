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
  }

  static contextTypes = {
    router: React.PropTypes.object
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

  componentDidUpdate(){
    if(this.props.shopItems.phase === "payTrailPayment"){
      SV.widget.initWithForm('payment', {charset:'ISO-8859-1'});
    }
  }

  renderPayTrail(){
    console.log("RENDER PAY TRAIL");
    let merchantAuthenticationhash = "6pKF4jkv97zmqBJ3ZL8gUw5DfT2NMQ"
    let merchantId = "13466"
    let amount = "99.90"
    let orderNumber = "123456"
    let referenceNumber = ""
    let orderDescription = "testitilaus"
    let currency = "EUR"
    let returnAddress = "https://joogakoulusilta-projekti.firebaseapp.com/#/user"
    let cancelAddress = "https://joogakoulusilta-projekti.firebaseapp.com/#/user"
    let pendingAddress = ""
    let notifyAddress = "http://joogaserver-stage.herokuapp.com/notifypayment"
    let type = "S1"
    let culture = "fi_FI"
    let preselectedMethod = ""
    let mode = "1"
    let visibleMethods = ""
    let group = ""
    let authcode = md5(merchantAuthenticationhash + '|' + merchantId + '|' + amount + '|' + orderNumber + '|' + referenceNumber + '|' + orderDescription + '|' + currency + '|' + returnAddress + '|' + cancelAddress + '|' + pendingAddress + '|' + notifyAddress + '|' + type + '|' + culture + '|' + preselectedMethod + '|' + mode + '|' + visibleMethods + '|' + group).toUpperCase();
    console.log(authcode);
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
        <input name="AUTHCODE" type="hidden" value={authcode}/>
        <input type="submit" value="Siirry maksamaan"/>
      </form>

    )
  }

  componentWillUnmount(){
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

  renderStartPhase(){
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
    console.log("SWITCH: ", this.props.shopItems.phase);
    switch(this.props.shopItems.phase){
      case "payTrailPayment":
      console.log("IN switch paytrail");
        return this.renderPayTrail()
      case "cashPayment":
        return this.renderCashPayment()
      case "braintreePayment":
          this.paymentOngoing = false;
          return this.renderStartPhase()
      case "tokenReceived":
        return this.renderPayment()
      case "done":
        return this.renderDonePhase()
      case "error":
        return this.renderError()
      case "timeout":
        return(<p> Palataan takaisin päänäkymään.</p>)
      case "start":
        this.context.router.push('user');
        break;
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
