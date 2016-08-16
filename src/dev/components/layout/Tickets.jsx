import React from 'react'

import { daysLeft } from '../../helpers/timeHelper.js'

export default class Tickets extends React.Component {

  constructor(){
    super();
    this.count = 0;
    this.firstexpire = new Date();    
  }

  componentWillMount(){
    this.count = this.props.curUsr.transactions.count;
    this.firstexpire.setTime(this.props.curUsr.transactions.firstexpire);
  }

  componentWillReceiveProps(nextProps){
    this.count = nextProps.curUsr.transactions.count;
    this.firstexpire.setTime(nextProps.curUsr.transactions.firstexpire);
  }

  daysRemaining(){
    const { time } = this.props.curUsr.transactions;
    return daysLeft(time)
  }

  render() {
    return (
      <div className="tickets-container mobile-hidden" id="tickets-info" title={"Sinulla on " + this.daysRemaining() + " päivää jäljellä aikakortissasi"}>
        <span className="ticket-logo">
          <img className="mini-icon" src="./assets/clock.png" />
          <p className="ticket-amnt">{this.daysRemaining()} pv</p>
        </span>
        <span className="ticket-logo" title={"Sinulla on käytettävissäsi " + this.count + " kertalippua"}>
          <img className="mini-icon" src="./assets/ticket.png" />
          <p className="ticket-amnt">{this.count} krt</p>
        </span>
      </div>
    )
  }
}




