import React from "react";
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as actionCreators from '../../actions/auth.js'
import { Link } from "react-router"

export default class TopBar extends React.Component {

  componentWillMount() {
    this.props.actions.authListener();
  }

  handleLogout = (e) => {
    e.preventDefault();
    console.log("Logging out.");
    this.props.actions.logout();
  }

  render() {
    var userText;
    var button;
    if(this.props.auth) {
      userText = <h4>Kirjautunut sähköpostilla: {this.props.auth.email}</h4>;
      button = <button className="btn-small logout-btn" onClick={this.handleLogout}>Kirjaudu ulos</button>;
    } else {
      userText = null;
      button = <Link className="btn-small login-btn" to="login">Kirjaudu sisään</Link>;
    }
    return (
      <div class="authentication-bar">
        {userText}
        {button}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { auth: state.auth }
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(actionCreators, dispatch) }
}

export default connect(mapStateToProps, mapDispatchToProps)(TopBar)
