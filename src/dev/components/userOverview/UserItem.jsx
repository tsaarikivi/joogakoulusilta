import React from 'react'

import { daysLeft, getDayStrMs } from '../../helpers/timeHelper.js'

export default class UserItem extends React.Component {

  constructor(){
    super();
    this.counter = 0;
  }

  renderSpecialItem(item){
    return (<li key={this.counter++} >{item.shopItem.title}, ostotapa: {item.paymentInstrumentType}</li>)
  }

  renderSpecials(){
    const { credits } = this.props
    if(credits){
      if(credits.details.special.length > 0){
        return(
          <ul>
          {credits.details.special.map(this.renderSpecialItem.bind(this))}
          </ul>
        )
      }
    }
    return(<div/>)
  }

  renderCredits(){
    const { credits } = this.props
    if(credits){
      let firstExpires = (credits.firstexpire !== 0)? ", josta kaikki tai osa vanhenee " + getDayStrMs(credits.firstexpire) : ""
      return(
        <div>
          <p>Kertoja: {credits.count}{firstExpires}</p> 
          <p>Päiviä: {daysLeft(credits.time)}</p>
        </div>
      )
    }
    return(<div/>)
  }


  render() {
    const {item} = this.props
    return (
      <li className="text-list-item">
        <span className="item-row">{item.uid} --- {item.email}</span>
        <span className="item-row">{item.firstname} {item.lastname}</span>
        {this.renderCredits()}
        {this.renderSpecials()}
      </li>
    )
  }
}
