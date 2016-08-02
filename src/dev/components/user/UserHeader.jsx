import React from "react";
import { Link } from "react-router"
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as authActionCreators from '../../actions/auth.js'
import * as userActionCreators from '../../actions/user.js'
import {getDayStr,getTimeStr} from '../../helpers/timeHelper.js'

class UserHeader extends React.Component {

  constructor(){
    super();
    this.count = 0;
    this.firstexpire = new Date();
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

  componentWillMount(){
    this.count = this.props.curUsr.transactions.count;
    this.firstexpire.setTime(this.props.curUsr.transactions.firstexpire);
  }

  componentWillReceiveProps(nextProps){
    this.count = nextProps.curUsr.transactions.count;
    this.firstexpire.setTime(nextProps.curUsr.transactions.firstexpire);
  }


  renderTickets() {
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

  render() {

    const { roles, firstname } = this.props.curUsr;

    let toTheShop = <Link className="text-link text-link-white" to="shop">Kauppaan</Link>

    let admin = null;
    if(roles.admin){
      admin = <Link className="text-link text-link-white" to="admin">Admin</Link>
    }
    let tests = null;
    if(roles.tester){
      tests = <Link className="text-link text-link-white" to="tests">Test</Link>
    }
    let instructor = null;
    if(roles.instructor){
      instructor = <Link className="text-link text-link-white" to="instructor">Opettaja</Link>
    }
    return (
      <div class="container bordered-container user-header-container">
        <div className="content-container">
          {this.renderTickets()}
          <div className="userinfo-container">
            <div className="mobile-row">
              <Link className="text-link text-link-white" to="userProfile">Käyttäjätiedot</Link>
            </div>
            <div className="mobile-row">
              {toTheShop}
            </div>
            <div className="mobile-row">
              {instructor}
            </div>
            <div className="mobile-row">
              {admin}
            </div>
            <div className="mobile-row">
              {tests}
            </div>
          </div>
        </div>
      </div>
    )
  }

}
function mapStateToProps(state) {
  return { auth: state.auth, currentUser: state.currentUser }
}

function mapDispatchToProps(dispatch) {
  return {
    authActions: bindActionCreators(authActionCreators, dispatch),
    userActions: bindActionCreators(userActionCreators, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserHeader)
