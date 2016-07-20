import React from "react";
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as actionCreators from '../actions/auth.js'
import Logo from '../components/logos/JoogakouluLogo.jsx'

class Login extends React.Component {

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
    this.props.actions.login(email, password);
  }

  render() {
    return (
      <div className="container">
        <Logo />
        <h2 className="centered login-header">Kirjaudu sisään Joogakoulu Siltaan</h2>
        <div className="content-container login-container">          
          <form>            
            <label>Sähköposti</label>
            <input id="email" type="email" name="email" placeholder="Sähköposti"/>
            <label>Salasana</label>
            <input id="password" type="password" name="password" placeholder="Salasana"/>
            <button className="btn-small btn-blue" onClick={this.handleLogin}>Kirjaudu</button>
            <br/>
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
