import React from "react";

export default class SubmitPayTrail extends React.Component {

  renderCartInfo() {
    const {cart} = this.props.shopItems
    console.log("CART", cart)
    return (
      <div className="surrounded-border">
        <p className="info-line border-bottom">Tuote: {cart.title}</p>
        <p className="info-line border-bottom">Kuvaus: {cart.desc}</p>
        <p className="info-line text-blue text-bold">Hinta: {cart.price}&euro;</p>
      </div>
    )
  }

  render() {    
    return(
      <div className="container checkout-container">
        <div className="content-container">
          <button className="btn-small btn-red" onClick={() => this.props.actions.cancelPaytrailPayment(this.props.shopItems.initializedTransaction)}>Peru osto</button>
          <h3 className="margin-top nopadding">Ostoskori</h3>
          {this.renderCartInfo()}
          <button className="btn-small btn-blue mobile-full" onClick={() => this.props.actions.buyWithPaytrail(this.props.shopItems.initializedTransaction)}>Siirry maksamaan</button>
        </div>
      </div>
    )
  }
}
