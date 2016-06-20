import React from "react";
import Jquery from "jquery"


var Braintree = require("braintree-web");
import DropIn from "../components/shop/BraintreeDropIn.jsx";

export default class Checkout extends React.Component {

  constructor(){
    super();
    this.token = "";
    this.getToken();
  }

  componentWillMount() {
    const { store } = this.props;
    const { database } = this.props;
    const { price } = this.props;
    console.log(price);
}

  getToken() {
    console.log("requesting client token");
    let that = this;
    try {
      Jquery.ajax({
           async: true,
           type: 'GET',
           url: 'http://localhost:3000/clientToken',
           success: function(result) {
             that.token = result;
             that.forceUpdate()
           }
      });
      } catch(error) {
        // Handle error
        that.token = "error"
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
        console.log("Payment method received. Sending nonce to server");
        let that = this;
        try {
          Jquery.ajax({
               async: false,
               type: 'POST',
               url: 'http://localhost:3000/checkout',
               data: {
                 payment_method_nonce: payload.nonce
               },
               success: function(result) {
                 console.log("Checkout DONE: " + result);
                 that.token = "done";
                 that.forceUpdate();
               }
          });
          } catch(error) {
            // Handle error
            console.log("CHECKOUT_ERROR:");
            console.error(error);
            that.token = "error";
            that.forceUpdate();
          }

  }


  render() {
    if(this.token === "") {
      return(
        <div>Alustetaan maksuyhteyttä...</div>
      )
    } else if(this.token === "done") {
      return(
        <div>Maksu suoritettu...</div>
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
                <input type='submit' value='Vahvista'></input>
              </form>
            </div>
      );
    }
  }
}
