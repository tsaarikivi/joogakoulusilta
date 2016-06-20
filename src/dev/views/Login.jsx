import React from "react";
import { Link } from "react-router"

export default class Login extends React.Component {
  constructor(props) {
    super();
    this.state = {
      error: "",
      user: ""
    };
    props.route.auth.onAuthStateChanged( function(user) {
      if (user) {
        console.log("Logged in.");
        this.setState({user: user.email});
      } else {
        console.log("Not logged in.");
        this.setState({user: "NOT LOGGED IN"});
      }
    }.bind(this));
  }

  onError = (e) => {
    this.setState({error: e});
  }

  handleLogin = (e) => {
    e.preventDefault();
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    var { auth } = this.props.route;
    var user = auth.currentUser;
    if(user){
      auth.signOut().then(function() {
        console.log("Logged out succesfully.");
      }, function(error) {
        console.log("Error happened when logging out: " + error.code + error.message);
      });
    }
    auth.signInWithEmailAndPassword(email, password).catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorCode + " " + errorMessage);
      switch (errorCode) {
        case INVALID_EMAIL:
          this.onError("Sähköpostiosoite on väärässä muodossa.");
          break;
        case USER_DISABLED:
          this.onError("Tunnukset on jäädytetty.");
          break;
        case USER_NOT_FOUND:
          this.onError("Sähköpostiosoitetta ei löydy.");
          break;
        case WRONG_PASSWORD:
          this.onError("Salasana on väärä.");
          break;
        default:
          this.onError("Virhe kirjautumisessa");
      }
    }.bind(this));
  }

  render() {
    return (
      <div class="container">
        <h4>Logged in as {this.state.user}</h4>
        <form>
          <h1>Kirjaudu sisään</h1>
            <h3 style={{color: 'red'}}>{this.state.error}</h3>
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

var INVALID_EMAIL = "auth/invalid-email";
var USER_DISABLED = "auth/user-disabled"
var USER_NOT_FOUND = "auth/user-not-found"
var WRONG_PASSWORD = "auth/wrong-password"
