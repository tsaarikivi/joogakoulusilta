import React from "react";
import { Link } from "react-router"
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as actionCreators from '../../actions/auth.js'
import Logo from '../logos/JoogakouluLogo.jsx'

class HomeLoginRegister extends React.Component {
  static contextTypes = {
    router: React.PropTypes.object
  }


  constructor(){
    super();
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.auth.uid){
          this.context.router.push('user');
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
      <div class="container bordered-container centered">
        <Logo />
        <Link className="text-link" to="info">Tutustu tarkemmin</Link>

        <h2 className="centered login-header">Kirjaudu sisään Joogakoulu Siltaan</h2>
        <div className="content-container login-container">          
          <form>            
            <label>Sähköposti</label>
            <input id="email" type="email" name="email" placeholder="Sähköposti"/>
            <label>Salasana</label>
            <input id="password" type="password" name="password" placeholder="Salasana"/>
            <button className="btn-small btn-blue" onClick={this.handleLogin}>Kirjaudu</button>
            <Link to="forgotPassword" className="mini-link">Unohditko salasanasi?</Link>  
            <br/>
          </form>
        </div>

        <div className="register-container">
          <p>Oletko uusi käyttäjä?</p>
          <Link className="text-link" to="register">Rekisteröidy</Link>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return { auth: state.auth, currentUser: state.currentUser }
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(actionCreators, dispatch) }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeLoginRegister)