import React from "react";
import { Link } from 'react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as actionCreators from '../actions/auth.js'

class ChangeInformation extends React.Component {

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

  handleSubmit(e) {
    e.preventDefault();
    console.log("Submit");
  }



  render() {
    return (
      <div class="container">
        <Link className="btn-small btn-blue" to="user">Takaisin</Link>
          <form>
            <h1>Käyttäjätiedot</h1>
            <label>Sähköposti</label>
            <input id="email" type="email" name="email"/>
            <label>Salasana</label>
            <input id="password" type="password" name="password" placeholder="Salasana"/>
            <label>Etunimi</label>
            <input id="firstName" type="text" name="firstName" placeholder="Etunimi"/>
            <label>Sukunimi</label>
            <input id="surname" type="text" name="surname" placeholder="Sukunimi"/>
            <br/>
            <button className="btn-small btn-blue" onClick={this.handleSubmit.bind(this)}>Päivitä tiedot</button>
            <br/>
            <b>{this.errorText}</b>
          </form>
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

export default connect(mapStateToProps, mapDispatchToProps)(ChangeInformation)
