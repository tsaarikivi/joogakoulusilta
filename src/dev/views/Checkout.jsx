import React from "react";
var Braintree = require("braintree-web");
import ClientToken from "../components/shop/ClientToken.jsx";
import DropIn from "../components/shop/BraintreeDropIn.jsx";

export default class Checkout extends React.Component {

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
    return (
          <div>
            <p>Testaa numerolla: <code>4111 1111 1111 111</code> Päivämärä voi olla mikä vaan.</p>
            <form action='/transactions' method='POST'>
                <DropIn
                    braintree={Braintree}
                    clientToken={ClientToken}
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
