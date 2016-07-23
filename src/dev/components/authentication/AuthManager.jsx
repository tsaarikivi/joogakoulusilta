import React from "react";
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as authActionCreators from '../../actions/auth.js'
import * as userActionCreators from '../../actions/user.js'
import { Link } from "react-router"

class AuthManager extends React.Component {

  static contextTypes = {
    router: React.PropTypes.object
  }

  constructor(){
    super();
    this.userInitialized = false;
  }

  componentWillMount() {
    this.props.authActions.authListener();
  }

  componentWillReceiveProps(newProps){
    if(newProps.auth.uid){
      if(!this.userInitialized){
        this.userInitialized = true;
        this.props.userActions.fetchUserDetails(newProps.auth.uid)
        this.props.userActions.fetchUsersTransactions(newProps.auth.uid)
        this.props.userActions.fetchUsersBookings(newProps.auth.uid)
        this.props.userActions.fetchUsersSpecialCourseBookings(newProps.auth.uid)

      }
    } else {
      if (this.userInitialized){
        this.props.userActions.finishedWithUserDetails()
        this.context.router.push('/')
        this.userInitialized = false;
      }
    }
  }

  componentWillUnmount() {
    this.props.authActions.logout();
    this.props.userActions.finishedWithUserDetails()
  }


  render() {
    var userError = null;
    if(this.props.currentUser.error)
    if (this.props.currentUser.error.code !== "0"){
      userError = <p>User error: {this.props.currentUser.error.code} {this.props.currentUser.error.message}</p>
    }
      var authError = null;
    if(this.props.auth.error){
      if (this.props.auth.error.code !== "0"){
        authError = <p>Auth error: {this.props.auth.error.code} {this.props.auth.error.message}</p>
      }
    }


    return (<div>
        {authError}
        {userError}
    </div>)
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

export default connect(mapStateToProps, mapDispatchToProps)(AuthManager)
