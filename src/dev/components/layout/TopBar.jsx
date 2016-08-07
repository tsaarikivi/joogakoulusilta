import React from "react";
import { Link } from "react-router"
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as authActionCreators from '../../actions/auth.js'
import * as userActionCreators from '../../actions/user.js'
import {getDayStr,getTimeStr} from '../../helpers/timeHelper.js'
import Tickets from './Tickets.jsx'

class TopBar extends React.Component {  

  renderTickets() {
    return (
      <Tickets curUsr={this.props.curUsr} />
    )
  }

  componentWillMount() {
    this.setState({navOpen: false})
  }

  toggleNav() {
    if (this.state.navOpen) {
      this.setState({navOpen: false})
      document.getElementById("nav-btn").classList.remove("mobile-hidden")
      document.getElementById("nav-menu").classList.add("mobile-hidden")
    } else {
      this.setState({navOpen: true})
      document.getElementById("nav-btn").classList.add("mobile-hidden")
      document.getElementById("nav-menu").classList.remove("mobile-hidden")
    }
  }

  render() {

    const { roles, firstname } = this.props.curUsr; 

    let admin = null;
    let diagnostics = null
    if(roles.admin){
      admin = <Link className="text-link text-link-white" to="admin" onClick={() => this.toggleNav()}>Admin</Link>
      diagnostics = <Link className="text-link text-link-white" to="diagnostics" onClick={() => this.toggleNav()}>Diagnostiikka</Link>
    }
    let tests = null;
    if(roles.tester){
      tests = <Link className="text-link text-link-white" to="tests" onClick={() => this.toggleNav()}>Test</Link>
    }
    let instructor = null;
    if(roles.instructor){
      instructor = <Link className="text-link text-link-white" to="instructor" onClick={() => this.toggleNav()}>Opettaja</Link>
    }

    if (this.props.curUsr.key != '0') {
      return (
        <div class="container user-header-container light-bg">
          <div className="content-container">
            {this.renderTickets()}
            <img src="./assets/nav.png" className="nav-btn float-right desktop-hidden" id="nav-btn" onClick={() => this.toggleNav()}/>
            <div className="userinfo-container mobile-hidden" id="nav-menu">
              <div className="mobile-row">
                <Link className="text-link text-link-white" to="user" onClick={() => this.toggleNav()}>Aikataulu</Link>
              </div>
              <div className="mobile-row">
                <Link className="text-link text-link-white" to="specialCourses" onClick={() => this.toggleNav()}>Erikoiskurssit</Link>
              </div>
              <div className="mobile-row">
                <Link className="text-link text-link-white" to="shop" onClick={() => this.toggleNav()}>Kauppa</Link>
              </div>
              <div className="mobile-row">
                <Link className="text-link text-link-white" to="userProfile" onClick={() => this.toggleNav()}>Käyttäjätiedot</Link>
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
              <div className="mobile-row">
                {diagnostics}
              </div>
            </div>
          </div>
        </div>
      )
    } else {
      return <div></div>
    }
    
  }

}
function mapStateToProps(state) {
  return { auth: state.auth, curUsr: state.currentUser }
}

function mapDispatchToProps(dispatch) {
  return {
    authActions: bindActionCreators(authActionCreators, dispatch),
    userActions: bindActionCreators(userActionCreators, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TopBar)