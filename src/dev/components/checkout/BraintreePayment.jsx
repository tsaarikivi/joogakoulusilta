import React from "react";
var Braintree = require("braintree-web");

import DropIn from "./BraintreeDropIn.jsx";

export default class CashPayment extends React.Component {

  render() {
    return (
        <div>
            <h2 className="centered">Valitse maksutapa ja vahvista maksu.</h2>
            <form action='/transactions' method='POST'>
                <DropIn
                    braintree={Braintree}
                    clientToken={this.props.shopItems.token}
                    onReady={this.props.onReady}
                    onError={this.props.onError}
                    onPaymentMethodReceived={this.props.onPaymentMethodReceived}
                />
                <br></br>
                <p>{this.props.shopItems.cart.title}</p><br></br>
                <p>Hinta: {this.props.shopItems.cart.price} € </p>
                <input type='submit' id="submitButton" disabled='true' className="btn-small btn-blue" value='Vahvista!'></input>
            </form>
        </div>
    );
  }
}
