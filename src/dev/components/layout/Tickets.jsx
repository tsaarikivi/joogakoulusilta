import React from 'react'

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

  daysLeft(){
    const { time } = this.props.curUsr.transactions;
    let today = new Date();
    let duration = 0;
    let daysLeft = 0;
    if(this.props.curUsr.transactions.time != 0){
      duration = time - today.getTime()
      return Math.round(duration / (24*60*60*1000))
    } else {
      return 0;
    }
  }

  render() {
    return (
      <div className="tickets-container" title={"Sinulla on " + this.daysLeft() + " päivää jäljellä aikakortissasi"}>
        <span className="ticket-logo">
          <img className="mini-icon" src="./assets/clock.png" />
          <p className="ticket-amnt">{this.daysLeft()} pv</p>
        </span>
        <span className="ticket-logo" title={"Sinulla on käytettävissäsi " + this.count + " kertalippua"}>
          <img className="mini-icon" src="./assets/ticket.png" />
          <p className="ticket-amnt">{this.count} krt</p>
        </span>
      </div>
    )
  }
}




