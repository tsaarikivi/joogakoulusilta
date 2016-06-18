import React from "react";
import Jquery from "jquery"


var Braintree = require("braintree-web");
import DropIn from "../components/shop/BraintreeDropIn.jsx";

export default class Checkout extends React.Component {

  constructor(){
    super();
    this.getToken();
  }

  getToken() {
    console.log("requesting client token");
    var that = this;
    try {
      Jquery.ajax({
           async: false,
           type: 'GET',
           url: 'http://localhost:3000',
           success: function(result) {
             that.token = result;
             console.log("Token: " + result);
           }
      });
      } catch(error) {
        // Handle error
        console.log("TOKEN_ERROR:");
        console.error(error);
      }
  }

  onReady() {
      console.log('Drop-In ready');
  }

  onError(err) {
        console.error(err);
  }

  onPaymentMethodReceived(payload) {
        console.log(payload);

        // Now that you have a nonce, send it to your
        // server to create a payment method or a transaction
  }

  render() {
    console.log('token-is: ' + this.token);
    return (
          <div>
            <p>Testaa numerolla: <code>4111 1111 1111 111</code> Päivämärä voi olla mikä vaan.</p>
            <form action='/transactions' method='POST'>
                <DropIn
                    braintree={Braintree}
                    clientToken={this.token}
                    onReady={this.onReady}
                    onError={this.onError}
                    onPaymentMethodReceived={this.onPaymentMethodReceived}
                />
                <input type='submit' value='Buy for $14' />
            </form>
          </div>
    );
  }
}
