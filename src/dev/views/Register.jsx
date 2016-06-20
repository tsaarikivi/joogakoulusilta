import React from "react";
import { Link } from "react-router"

export default class Register extends React.Component {
  constructor() {
    super();
    this.state = {
      error: ""
    };
  }

  onError = (e) =>  {
    this.setState({error: e});
  }

  handleRegister = (e) => {
    e.preventDefault();
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    console.log("password: "+password );
    var { auth } = this.props.route;
    auth.createUserWithEmailAndPassword(email, password).catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorCode + " " + errorMessage);
      switch (errorCode) {
        case EMAIL_ALREADY_IN_USE:
          this.onError("Sähköpostiosoite on jo käytössä.");
          break;
        case INVALID_EMAIL:
          this.onError("Sähköpostiosoite on väärässä muodossa.");
          break;
        case OPERATION_NOT_ALLOWED:
          this.onError("Authentikaatiota ei ole sallittu palvelimella. Ota yhteytttä kehittäjiin.");
          break;
        case PASSWORD_TOO_WEAK:
          this.onError("Salasana on liian lyhyt.");
          break;
        default:
          this.onError("Virhe rekisteröinnissä.");
      }
      return;
    }.bind(this));
  }

  render() {
    return (
      <div class="container">
          <form>
            <h1>Rekisteröidy käyttäjäksi</h1>
            <h3 style={{color: 'red'}}>{this.state.error}</h3>
            <label>Sähköposti</label>
            <input id="email" type="email" name="email" placeholder="Sähköposti"/>
            <label>Salasana</label>
            <input id="password" type="password" name="password" placeholder="Salasana"/>
            <br/>
            <button className="btn-small login-btn" onClick={this.handleRegister}>Rekisteröidy</button>
          </form>
      </div>
    );
  }
}

var EMAIL_ALREADY_IN_USE = "auth/email-already-in-use";
var INVALID_EMAIL = "auth/invalid-email"
var OPERATION_NOT_ALLOWED = "auth/operation-not-allowed"
var PASSWORD_TOO_WEAK = "auth/weak-password"
