import React from "react";
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as authActionCreators from '../../actions/auth.js'
import * as userActionCreators from '../../actions/user.js'
import { Link } from "react-router"

class TopBar extends React.Component {

  static contextTypes = {
    router: React.PropTypes.object
  }

  componentWillMount() {
    this.props.authActions.authListener();
  }

  handleLogout = (e) => {
    e.preventDefault();
    console.log("Logging out.");
    if(this.props.auth.uid){
      console.log("11111");
      this.props.authActions.logout();
      console.log("22222");
      this.props.userActions.finishedWithUserDetails();
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
      button = <button className="btn-small logout-btn btn-blue" onClick={this.handleLogout.bind(this)}>Kirjaudu ulos</button>;
    } else {
      userText = null;
      button = <Link className="btn-small btn-blue" to="login">Kirjaudu sisään</Link>;
    }
    return (
      <div class="authentication-bar container bordered-container centered">
        {userText}
        {button}
      </div>
    );
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

export default connect(mapStateToProps, mapDispatchToProps)(TopBar)
