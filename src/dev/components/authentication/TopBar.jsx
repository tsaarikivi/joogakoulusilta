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
    if(this.props.auth.uid){
      this.props.authActions.logout();
      this.props.userActions.finishedWithUserDetails();
    }
    else {
      console.log("User not logged in. No action taken.");
    }
  }

  render() {
    var userText;
    var button;
    var profile;
    if(this.props.auth.uid) {
      userText = <h4>Kirjautunut sähköpostilla: {this.props.auth.email}</h4>;
      button = <button className="btn-small logout-btn btn-blue" onClick={this.handleLogout.bind(this)}>Kirjaudu ulos</button>;
      profile =  <Link className="btn-small btn-blue" to="userProfile">Käyttäjätiedot</Link>

    } else {
      userText = null;
      profile = null;
      button = <Link className="btn-small btn-blue" to="login">Kirjaudu sisään</Link>;
    }
    return(<div/>);
    return (
      <div class="authentication-bar container bordered-container centered">
        {userText}
        {button}
        {profile}
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
