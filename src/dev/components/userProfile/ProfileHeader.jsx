import React from "react"
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as authActionCreators from '../../actions/auth.js'
import * as userActionCreators from '../../actions/user.js'
import { Link } from 'react-router'

class ProfileHeader extends React.Component {

  handleLogout = (e) => {
    e.preventDefault();
    if(this.props.auth.uid){
      this.props.authActions.logout();
      this.props.userActions.finishedWithUserDetails();
    }
    else {
      console.log("User not logged in. No action taken.");
    }
  }

  render() {
    var errorData = null;
    if (this.props.userError.code != 0){
      errorData = <p>Error: {this.props.userError.code} {this.props.userError.message}</p>
    }
    return (
      <div class="container bordered-container">
        <div className="content-container">
        <button className="btn-small btn-red float-right" onClick={this.handleLogout.bind(this)}>Kirjaudu ulos</button>
        <Link className="text-link back-btn" to="user">&lt;Takaisin</Link>
        <h1>Käyttäjän hallinnointi.</h1>        
        {errorData}
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
