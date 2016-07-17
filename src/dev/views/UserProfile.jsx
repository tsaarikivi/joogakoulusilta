import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as actionCreators from '../actions/user.js'

import ProfileHeader from '../components/userProfile/ProfileHeader.jsx'
import UserDataForm from '../components/userProfile/UserDataForm.jsx'
import UserBookings from '../components/userProfile/UserBookings.jsx'
import UserTransactions from '../components/userProfile/UserTransactions.jsx'

class UserProfile extends React.Component {

  static contextTypes = {
    router: React.PropTypes.object
  }

  componentWillMount(){
    if( this.props.auth.uid ) {
      this.props.actions.fetchUserDetails(this.props.auth.uid);
      this.props.actions.fetchUsersTransactions(this.props.auth.uid);
      this.props.actions.fetchUsersBookings(this.props.auth.uid);
    }
    else {
      this.context.router.push('/');
    }
  }

  componentWillUnmount(){
    this.props.actions.finishedWithUserDetails();
  }


  componentWillReceiveProps(nextProps){
  }


  render() {
    return(
      <div>
        <ProfileHeader userError={this.props.currentUser.error}/>
        <UserDataForm/>
        <UserBookings/>
        <UserTransactions/>
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

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile)
