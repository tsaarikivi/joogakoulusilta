import React from 'react'

import { daysLeft, getDayStrMs } from '../../helpers/timeHelper.js'

export default class ValidItem extends React.Component {

  constructor(){
    super()
    this.confirmation = false
    this.timeoutId = 0
  }

  componentWillUnmount() {
    if(this.timeoutId !== 0) {
      clearTimeout(this.timeoutId)
    }
  }

  remove(item) {
    if(this.confirmation) {
      //removeAction (item)
      this.confirmation = false
    } else {
      this.confirmation = true
      this.forceUpdate()
      this.timeoutId = setTimeout(() => {
        this.confirmation = false;
        this.forceUpdate()
      }, 2000)
    }
  }

  render() {
    let removeButtonText = (this.confirmation)? "Vahvista poisto" : "Poista"
    const { item } = this.props
    return (
      <li>
        <span className="item-row">kortti: {item.shopItem.title}</span>
        <span className="item-row">ostettu: {getDayStrMs(item.purchasetime)} ostotapa: {item.paymentInstrumentType}</span>
        <button className="btn-small btn-red" onClick={() => {this.remove(item)}}>{removeButtonText}</button>
      </li>
    )
  }
}
