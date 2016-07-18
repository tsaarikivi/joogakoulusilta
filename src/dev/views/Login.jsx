import React from "react";
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as actionCreators from '../actions/auth.js'

class Login extends React.Component {

  static contextTypes = {
    router: React.PropTypes.object
  }


  constructor(){
    super();
    this.errorText = ""
  }

  componentWillReceiveProps(nextProps){
    console.log("NEXT PROPS:", nextProps);
    if(nextProps.auth.error.code != 0){
      this.errorText = nextProps.auth.error.message;
    }
    else {
      this.errorText = ""
      if(nextProps.auth.uid){
            this.context.router.push('user');
      }
    }
  }


  handleLogin = (e) => {
    e.preventDefault();
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    console.log("Logging in with email and password.");
    this.props.actions.login(email, password);
  }

  render() {
    return (
      <div className="container">
        <div className="content-container">
          <form>
            <h1>Kirjaudu sisään</h1>
              <label>Sähköposti</label>
              <input id="email" type="email" name="email" placeholder="Sähköposti"/>
              <label>Salasana</label>
              <input id="password" type="password" name="password" placeholder="Salasana"/>
            <br/>
            <button className="btn-small btn-blue" onClick={this.handleLogin}>Kirjaudu</button>
            <br/>
            <b>{this.errorText}</b>
          </form>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { auth: state.auth, currentUser: state.currentUser }
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(actionCreators, dispatch) }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
