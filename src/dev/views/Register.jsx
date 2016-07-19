import React from "react";
import { Link } from "react-router"
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as actionCreators from '../actions/auth.js'
import Logo from '../components/logos/JoogakouluLogo.jsx'

class Register extends React.Component {

  constructor(){
    super();
    this.errorText = ""
  }

  componentWillReceiveProps(nextProps){
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
    var firstName = document.getElementById("firstName").value;
    var surname = document.getElementById("surname").value;
    this.props.actions.register(email, password, firstName, surname);
  }

  render() {
    if(this.props.auth.uid){
      return(
        <div>
          <p>Rekisteröinti onnistui!</p>
          <link className="btn-small btn-blue" to="user">Jatka sovelluksen käyttöä</link>
        </div>
      );
    } else {
      return (
        <div class="container">
          <Logo />
          <h2 className="centered login-header">Rekisteröidy käyttäjäksi</h2>
          <div className="content-container login-container">
            <form>              
              <label>Sähköposti</label>
              <input id="email" type="email" name="email" placeholder="Sähköposti"/>
              <label>Salasana</label>
              <input id="password" type="password" name="password" placeholder="Salasana"/>
              <label>Etunimi</label>
              <input id="firstName" type="text" name="firstName" placeholder="Etunimi"/>
              <label>Sukunimi</label>
              <input id="surname" type="text" name="surname" placeholder="Sukunimi"/>
              <br/>
              <button className="btn-small btn-blue" onClick={this.handleRegister.bind(this)}>Rekisteröidy</button>
              <br/>
              <b>{this.errorText}</b>
            </form>
          </div>  
        </div>
      );
    }
  }
}

function mapStateToProps(state) {
  return { auth: state.auth, currentUser: state.currentUser }
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(actionCreators, dispatch) }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register)
