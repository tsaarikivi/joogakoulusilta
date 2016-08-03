import React from 'react'

import PayTrailTerms from "./PayTrailTerms.jsx"

export default class SubmitPayTrail extends React.Component {

  constructor(){
    super();
    this.onceOnly = false;
  }

  componentWillMount(){
    this.onceOnly = false;
  }

  renderCartInfo() {
    const {cart} = this.props.shopItems
    return (
      <div className="surrounded-border">
        <p className="info-line border-bottom">Tuote: {cart.title}</p>
        <p className="info-line border-bottom">Kuvaus: {cart.desc}</p>
        <p className="info-line text-blue text-bold">Hinta: {cart.price}&euro;</p>
      </div>
    )
  }

  cancelPayment(initializedTransaction){
    if(!this.onceOnly){
      this.onceOnly = true;
      this.props.actions.cancelPaytrailPayment(this.props.shopItems.initializedTransaction)
    }
  }

  executePayment(initializedTransaction){
    if(!this.onceOnly){
      this.onceOnly = true;
      this.props.actions.buyWithPaytrail(initializedTransaction)
    }
  }

  openTerms() {
    document.getElementById("terms-container").classList.remove("hidden")
  }

  render() {    
    return(
      <div className="container checkout-container">
        <div className="content-container">
          <button className="btn-small btn-red" onClick={() => this.cancelPayment(this.props.shopItems.initializedTransaction)}>Peru osto</button>
          <h3 className="margin-top nopadding">Ostoskori</h3>
          {this.renderCartInfo()}
          <button className="btn-small btn-blue mobile-full margin-bottom" onClick={() => this.executePayment(this.props.shopItems.initializedTransaction)}>Siirry maksamaan</button>
          <div className="centered">
            <a className="text-link" onClick={() => this.openTerms()}>PayTrail palvelun käyttöehdot</a>
          </div>
          <div id="terms-container" className="hidden">
            <PayTrailTerms />
          </div>
        </div>
      </div>
    )
  }
}
