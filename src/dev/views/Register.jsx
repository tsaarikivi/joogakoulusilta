import React from "react";
import { Link } from "react-router"
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as actionCreators from '../actions/auth.js'
import Logo from '../components/logos/JoogakouluLogo.jsx'

class Register extends React.Component {

  static contextTypes = {
    router: React.PropTypes.object
  }


  constructor(){
    super();
    this.errorText = ""
    this.registerStarted = false;
    this.email = "";
    this.password = "";
    this.firstName = "";
    this.alias = "";
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.auth.error.code != 0){
      this.errorText = nextProps.auth.error.message;
    }
    else {
      this.errorText = "";
    }
    if(nextProps.auth.timeout === true){
      this.context.router.push('/user/')
    }
  }

  handleRegister(e) {
    e.preventDefault();
    this.email = document.getElementById("email").value;
    this.password = document.getElementById("password").value;
    this.firstName = document.getElementById("firstName").value;
    this.surname = document.getElementById("surname").value;
    this.alias = document.getElementById("alias").value;
    this.props.actions.register(this.email, this.password, this.firstName, this.surname, this.alias);
    this.registerStarted = true;
    this.forceUpdate();

  }

  render() {
    if(this.props.auth.uid){
      this.props.actions.waitForMilliseconds(5*1000);
      return(
        <div class="container">
          <Logo />
          <div className="content-container">
            <h2 className="centered">Rekisteröinti onnistui {this.firstName}!</h2>
            <Link className="btn-small btn-blue" to="user">Jatka sovelluksen käyttöä</Link>
          </div>
        </div>
        
      );
    }
    if(this.registerStarted === true && this.props.auth.error.code === 0){
      return(
        <div class="container">
          <Logo />
          <div className="content-container">
            <h2 className="centered">Rekisteröidään käyttäjää!</h2>
            <b>{this.errorText}</b>
          </div>
        </div>
      )
    }
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
              <label>Alias</label>
              <input id="alias" type="text" name="alias" placeholder="Alias"/>
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

function mapStateToProps(state) {
  return { auth: state.auth, currentUser: state.currentUser }
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(actionCreators, dispatch) }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register)
