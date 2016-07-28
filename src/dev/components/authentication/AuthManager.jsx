import React from "react";
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as authActionCreators from '../../actions/auth.js'
import * as userActionCreators from '../../actions/user.js'
import * as lsActionCreators from '../../actions/loadingScreen.js'

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

  componentWillReceiveProps(nextProps){
    const { currentUser, auth, loadingScreen } = nextProps;
    if(auth.uid){
      if(!this.userInitialized){
        this.userInitialized = true;
        this.props.lsActions.showLoadingScreen("Ladataan käyttäjätiedot.")
        this.props.userActions.fetchUserDetails(auth.uid)
        this.props.userActions.fetchUsersTransactions(auth.uid)
        this.props.userActions.fetchUsersBookings(auth.uid)
        this.props.userActions.fetchUsersSpecialCourseBookings(auth.uid)
      }
      if( currentUser.bookingsReady && currentUser.transactionsReady && currentUser.specialCoursesReady) {
        if(loadingScreen.visible && !loadingScreen.inTimeout){
          this.props.lsActions.hideLoadingScreen("Valmis", true, 500)
        }
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
      userError = <h2 className="centered">{this.props.currentUser.error.message}</h2>
    }
      var authError = null;
    if(this.props.auth.error){
      if (this.props.auth.error.code !== "0"){
        authError = <h2 className="centred">{this.props.auth.error.message}</h2>
      }
    }


    return (<div>
        {authError}
        {userError}
    </div>)
  }
}

function mapStateToProps(state) {
  return { auth: state.auth, currentUser: state.currentUser, loadingScreen: state.loadingScreen }
}

function mapDispatchToProps(dispatch) {
  return {
    authActions: bindActionCreators(authActionCreators, dispatch),
    userActions: bindActionCreators(userActionCreators, dispatch),
    lsActions: bindActionCreators(lsActionCreators, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthManager)
