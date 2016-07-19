import React from 'react'
import { reduxForm } from 'redux-form'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as actionCreators from '../../actions/auth.js'

class UserAuth extends React.Component {

  static contextTypes = {
    router: React.PropTypes.object
  }

  changeEmailPassword() {
    let email = document.getElementById("UAemail").value
    let passwd = document.getElementById("UApassword").value
    console.log("Change of email and passwd called", email, passwd)
    
    if(email !== this.props.auth.email){
      this.props.actions.updateEmailAddress(email)
    }
    if(passwd !== "Salasana"){
      this.props.actions.updatePassword(passwd)
    }
  }

  renderContent() {
    if(!this.props.auth) return( <div></div>)
    let emailLab = <label>Sähköposti</label>;
    if(this.props.auth.emailUpdated === true){
      emailLab = <label>Sähköposti päivitetty</label>;
    }
    let passwordLab = <label>Salasana</label>;
    if(this.props.auth.passwordUpdated === true){
      emailLab = <label>Salasana päivitetty</label>;
    }
      return (
            <form>              
              {emailLab}
              <input id="UAemail" type="email" name="email" defaultValue={this.props.auth.email}/>
              {passwordLab}
              <input id="UApassword" type="password" name="password" defaultValue="Salasana"/>
              <br/>
              <button className="btn-small btn-blue" onClick={this.changeEmailPassword.bind(this)}>Päivitä</button>
              <br/>
              <b>{this.errorText}</b>
            </form>
      )
  }

  render() {
    var errorData = null;
    if(this.props.auth){
      if (this.props.auth.error.code != 0){
        errorData = <p>Error: {this.props.currentUser.error.message}</p>
      }
    }
    return (
      <div className="container bordered-container">
        <div className="content-container">
          {errorData}
          <h2 className="header-collapse">Tunnistetietosi</h2>
          {this.renderContent()}
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return { auth: state.auth }
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(actionCreators, dispatch)}
}

export default connect(mapStateToProps, mapDispatchToProps)(UserAuth)
