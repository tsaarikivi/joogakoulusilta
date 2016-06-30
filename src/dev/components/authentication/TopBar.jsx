import React from "react";
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as actionCreators from '../../actions/auth.js'
import { Link } from "react-router"

export default class TopBar extends React.Component {

  static contextTypes = {
    router: React.PropTypes.object
  }

  componentWillMount() {
    this.props.actions.authListener();
  }

  handleLogout = (e) => {
    e.preventDefault();
    console.log("Logging out.");
    if(this.props.auth.uid){
      this.props.actions.logout();
      this.context.router.push('');
    }
    else {
      console.log("User not logged in. No action taken.");
    }
  }

  render() {
    var userText;
    var button;
    if(this.props.auth.uid) {
      userText = <h4>Kirjautunut sähköpostilla: {this.props.auth.email}</h4>;
      button = <button className="btn-small logout-btn" onClick={this.handleLogout.bind(this)}>Kirjaudu ulos</button>;
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
