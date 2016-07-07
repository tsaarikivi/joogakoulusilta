import React from "react";
import axios from "axios"
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

  constructor(){
    super();
    this.token = "";
    this.getClientToken();
    console.log(global);
  }

  getClientToken() {
    let that = this;
    console.log("requesting client token");
    let JOOGAURL = typeof(JOOGASERVER) === "undefined" ? 'http://localhost:3000/clientToken' : JOOGASERVER+'/clientToken'
    console.log("JOOGASERVER: ", JOOGASERVER);
    console.log("JOOGAURL: ", JOOGAURL);
    firebase.auth().currentUser.getToken(true).then( idToken => {
      console.log("IDTOKEN: ", idToken);
      axios.get(JOOGAURL + '?token=' + idToken)
      .then( response => {
        that.token = response.data;
        console.log("RESPONSE",response);
        that.forceUpdate()
      })
      .catch( error => {
        that.token = "error"
        console.error("TOKEN_ERROR:", error);
      });
    }).catch( error => {
      console.error("Failde to get authentication token for current user: ", error);
    });
  }

  onReady() {
      console.log('Drop-In ready');
  }

  onError(err) {
        console.error(err);
  }

  onPaymentMethodReceived(payload) {
    console.log("Payment method received. Sending nonce to server");
    let that = this;
    console.log("Checkout_PROPS::", this.props);
    let JOOGAURL = typeof(JOOGASERVER) === "undefined" ? 'http://localhost:3000/checkout' : JOOGASERVER+'/checkout'
    console.log("JOOGASERVER: ", JOOGASERVER);
    console.log("JOOGAURL: ", JOOGAURL);

    firebase.auth().currentUser.getToken(true).then( idToken => {
      console.log("IDTOKEN: ", idToken);

      axios.post(JOOGAURL,
        {
          payment_method_nonce: payload.nonce,
          item_key: this.props.cart.key,
          current_user: idToken
        })
      .then( result => {
        console.log("Checkout DONE: " + result);
        that.token = "done";
        that.forceUpdate();
      })
      .catch( error => {
        console.log("CHECKOUT_ERROR:");
        console.error(error);
        that.token = "error";
        that.forceUpdate();
      })
    }).catch( error => {
      console.error("Failde to get authentication token for current user: ", error);
    });

  }



  render() {
    if(this.token === "") {
      return(
        <div>Alustetaan maksuyhteyttä...</div>
      )
    } else if(this.token === "done") {
        return(
          <div>
            <p>Maksu onnistuneesti suoritettu...</p>
            <Link className="btn-small" to="shop"> Takaisin kauppaan...</Link>
          </div>
        )
    } else if(this.token === "error") {
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
                      clientToken={this.token}
                      onReady={this.onReady}
                      onError={this.onError}
                      onPaymentMethodReceived={this.onPaymentMethodReceived.bind(this)}
                  />
                <br></br>
                <p>{this.props.cart.title}</p><br></br>
                <p>Hinta: {this.props.cart.price} € </p>
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
  return { cart: state.cart, currentUser: state.currentUser }
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout)
