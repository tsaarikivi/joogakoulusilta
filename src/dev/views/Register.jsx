import React from "react";
import { Link } from "react-router"
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as actionCreators from '../actions/auth.js'

export default class Register extends React.Component {



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
      this.errorText = "";
    }
  }


  handleRegister = (e) => {
    e.preventDefault();
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    console.log("handle register:", email, password);
    this.props.actions.register(email, password);
  }

  render() {
    return (
      <div class="container">
          <form>
            <h1>Rekisteröidy käyttäjäksi</h1>
            <label>Sähköposti</label>
            <input id="email" type="email" name="email" placeholder="Sähköposti"/>
            <label>Salasana</label>
            <input id="password" type="password" name="password" placeholder="Salasana"/>
            <br/>
            <button className="btn-small login-btn" onClick={this.handleRegister.bind(this)}>Rekisteröidy</button>
            <br/>
            <b>{this.errorText}</b>
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

export default connect(mapStateToProps, mapDispatchToProps)(Register)
