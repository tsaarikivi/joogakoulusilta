import React from "react"
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link } from 'react-router'

import * as authActionCreators from '../../actions/auth.js'
import * as userActionCreators from '../../actions/user.js'

class ProfileHeader extends React.Component {

  static contextTypes = {
    router: React.PropTypes.object
  }

  constructor(){
    super();
    this.emailVerificationOngoing = false
  }

  handleLogout(){
    if(this.props.auth.uid){
      this.props.authActions.logout();
    }
    else {
      console.log("User not logged in. No action taken.");
    }
  }

  handleEmailVerify(){
    if(!this.emailVerificationOngoing){
      this.emailVerificationOngoing = true;
      this.props.userActions.sendEmailVerification()
    } 
  }

  render() {
    const { auth } = this.props

    var emailVerification = null
    if(auth.uid){
      if(!auth.userdata.emailVerified){
        emailVerification = <button className="btn-small btn-red margin-top margin-left" onClick={this.handleEmailVerify.bind(this)}>Varmista sähköpostisi</button>  
      }
    }

    return (
      <div class="container header-container">          
        <div className="content-container">
        <h1 className="padded-header">Käyttäjän hallinnointi</h1>
        <div className="block margin-top">
          <Link className="text-link text-link-white margin-top" to="feedback">Lähetä palautetta</Link>
          <button className="btn-small btn-red margin-top block" onClick={this.handleLogout.bind(this)}>Kirjaudu ulos</button>
        </div>
        {emailVerification}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { auth: state.auth, currentUser: state.currentUser }
}

function mapDispatchToProps(dispatch) {
  return {
    authActions: bindActionCreators(authActionCreators, dispatch),
    userActions: bindActionCreators(userActionCreators, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileHeader)
