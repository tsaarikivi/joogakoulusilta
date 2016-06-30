import React from "react";
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as actionCreators from '../actions/auth.js'

export default class Login extends React.Component {

  handleLogin = (e) => {
    e.preventDefault();
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    console.log("Logging in with email and password.");
    this.props.actions.login(email, password);
  }

  render() {
    return (
      <div class="container">
        <form>
          <h1>Kirjaudu sisään</h1>
            <label>Sähköposti</label>
            <input id="email" type="email" name="email" placeholder="Sähköposti"/>
            <label>Salasana</label>
            <input id="password" type="password" name="password" placeholder="Salasana"/>
          <br/>
          <button className="btn-small login-btn" onClick={this.handleLogin}>Kirjaudu</button>
        </form>
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

export default connect(mapStateToProps, mapDispatchToProps)(Login)
