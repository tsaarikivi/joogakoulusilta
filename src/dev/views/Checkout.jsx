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
           url: 'http://localhost:3000/clientToken',
           success: function(result) {
             that.token = result;
             //console.log("Token: " + result);
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
        console.log("Payment method received.")
        console.log(payload);
        console.log(payload.nonce);
        console.log("sending nonce");
        try {
          Jquery.ajax({
               async: false,
               type: 'GET',
               url: 'http://localhost:3000/checkout',
               data: {
                 payment_method_nonce: payload.nonce
               },
               success: function(result) {
                 console.log("Checkout DONE: " + result);
               }
          });
          } catch(error) {
            // Handle error
            console.log("CHECKOUT_ERROR:");
            console.error(error);
          }

  }


  render() {
    return (
          <div>
            <p>Testaa numerolla: <code>4111 1111 1111 1111</code> Päivämärä voi olla mikä vaan.</p>
            <form action='/transactions' method='POST'>
                <DropIn
                    braintree={Braintree}
                    clientToken={this.token}
                    onReady={this.onReady}
                    onError={this.onError}
                    onPaymentMethodReceived={this.onPaymentMethodReceived}
                />
              <input type='submit' value='10.00'></input>
            </form>
          </div>
    );
  }
}
