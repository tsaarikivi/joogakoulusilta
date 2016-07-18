import React from 'react'
import {getDayStrMs, getTimeStrMs} from '../../helpers/timeHelper.js'

class UserTransaction extends React.Component {

  render() {
    var unused = "";
    if(this.props.item.type === "count"){
      unused = "Käyttämättä: " + this.props.item.unusedtimes + "/" + this.props.item.usetimes + " -- "
    }
    return (
        <div className="transaction-container">
          <p>Ostettu: {this.props.item.shopItem.title} -- {getDayStrMs(this.props.item.purchasetime)} </p>
          <p>{unused}Voimassa: {getDayStrMs(this.props.item.expires)} </p>
          <p>Ostotapa: {this.props.item.paymentInstrumentType}</p>
        </div>
    )
  }
}

export default UserTransaction;
