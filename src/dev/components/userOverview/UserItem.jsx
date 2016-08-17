import React from 'react'

import { daysLeft, getDayStrMs } from '../../helpers/timeHelper.js'
import SpecialItem from './SpecialItem.jsx'
import ValidItem from './ValidItem.jsx'

export default class UserItem extends React.Component {

  constructor(){
    super();
    this.counter = 0;
  }

  renderCredits(){
    const { credits } = this.props
    if(credits){
      let firstExpires = (credits.firstexpire !== 0)? ", josta kaikki tai osa vanhenee " + getDayStrMs(credits.firstexpire) : ""
      return(
        <div>
          <p className="text-fade">Kertoja: {credits.count}{firstExpires}</p> 
          <p className="text-fade">Päiviä: {daysLeft(credits.time)}</p>
        </div>
      )
    }
    return(<div/>)
  }

  renderValidItem(item) {
    return (
      <ValidItem key={this.counter++} item={item} />
    )
  }

  renderValidTransactions() {
    const { credits } = this.props
    if (credits) {
      const { valid } = credits.details
      if (valid.length > 0) {
        return (
          <div>
            <p className="text-bold">Voimassa olevat kortit:</p>
            <ul className="wide-list">
              {valid.map(this.renderValidItem.bind(this))}
            </ul>
          </div>
        )
      }
    }
    return(<div/>)
  }

  renderSpecialItem(item){
    return (
      <SpecialItem key={this.counter++} item={item} />
    )
  }

  renderSpecials(){
    const { credits } = this.props
    if(credits){
      const { special } = credits.details
      if(special.length > 0){
        return(
          <div>
            <p className="text-bold">Ostetut kurssit:</p>
            <ul className="wide-list">
              {special.map(this.renderSpecialItem.bind(this))}
            </ul>
          </div>
        )
      }
    }
    return(<div/>)
  }

  render() {
    const {item} = this.props
    return (
      <li className="text-list-item">
        <span className="item-row">{item.firstname} {item.lastname}</span>
        <span className="item-row">{item.email}</span>
        {this.renderCredits()}
        {this.renderValidTransactions()}
        {this.renderSpecials()}
      </li>
    )
  }
}
